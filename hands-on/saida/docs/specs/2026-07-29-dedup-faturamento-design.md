# Corrigir divergência de faturamento no pipeline de pedidos

**Origem:** chamado SUP-7723, aberto pelo Financeiro
**Squad:** Dados
**Prioridade:** alta — trava o fechamento de junho

## Problema

Faturamento de junho no dashboard está R$ 200,00 acima do fechamento contábil. Causa: reprocessamento de lote em 2026-06-14 gerou linhas duplicadas em `bronze.pedidos`, que a transformação para `silver` soma sem deduplicar.

## Decisões

### Chave de duplicata

Duas linhas são a mesma transição de status quando têm `(pedido_id, status, atualizado_em)` idênticos. `bronze.pedidos` é append-only por linha de mudança de status (não por pedido); `atualizado_em` identifica o evento de negócio, `ingested_at` identifica só a ingestão física. Reprocessamento gera linha com `ingested_at` novo mas o resto idêntico — é isso que a chave precisa capturar.

### Camada da correção

Em `bronze → silver`, dentro de `deduplicar()`. `bronze` permanece imutável e com as duplicatas (requisito de auditoria, retenção de 5 anos, acordado com compliance em 2025-08-12 — fora de discussão). Corrigir na query do dashboard foi descartado: deixaria `silver` errado para qualquer outro consumidor.

### Critério de desempate

Dentro de cada grupo de chave duplicada, mantém a linha de menor `ingested_at` — o primeiro registro real do evento, não a cópia gerada pelo reprocessamento. Ordem relativa das linhas restantes é preservada.

### Faturamento

`faturamento_centavos()` soma `valor_centavos` das linhas com `status = 'pago'`, já operando sobre a saída de `deduplicar()`. A chave de dedup garante que cada `(pedido_id, 'pago')` aparece no máximo uma vez (salvo ciclo legítimo pago→estornado→pago, que teria `atualizado_em` diferente e não seria colapsado).

## Fora de escopo

- Mudar o formato append-only de `bronze` ou a política de retenção.
- Deduplicar por qualquer chave que ignore `atualizado_em` (colapsaria transições legítimas repetidas).
- Alterar a camada de leitura do dashboard.
- Adicionar dependência nova ao projeto.
- Tratar o caso de duas linhas com chave igual e `ingested_at` igual — não ocorre nos dados atuais e não tem teste dedicado.

## Testes que provam correção

Suíte existente em `tests/test_dedup.py`, sem alteração:

1. `test_remove_reprocessamento_do_lote` — não sobra duplicata exata de chave.
2. `test_nao_perde_pedido` — nenhum pedido desaparece.
3. `test_preserva_historico_de_status` — as 4 transições de PED-0003 sobrevivem.
4. `test_faturamento_bate_com_fechamento` — soma bate com R$ 770,00 (77000 centavos).
5. `test_cancelado_nao_entra_no_faturamento` — PED-0005 cancelado não vira receita.

## Implementação

`hands-on/dedup.py` — `deduplicar(linhas)` e `faturamento_centavos(linhas)`, stdlib apenas, sem mudar assinaturas.
