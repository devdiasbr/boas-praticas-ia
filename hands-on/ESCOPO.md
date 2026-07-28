# Escopo — corrigir divergência de faturamento no pipeline de pedidos

**Origem:** chamado SUP-7723, aberto pelo Financeiro
**Squad:** Dados
**Prioridade:** alta — trava o fechamento de junho

---

## Situação

O faturamento de junho no dashboard está **R$ 200,00 acima** do fechamento contábil.
A auditoria já perguntou. O fechamento precisa bater exatamente.

## O que se sabe

- O pipeline lê `bronze.pedidos` e materializa a camada `silver`, que alimenta o
  dashboard.
- Em **2026-06-14** houve um reprocessamento de lote no sistema de origem.
- A tabela `bronze.pedidos` tem uma linha por **mudança de status** de pedido —
  criado, pago, enviado, entregue, cancelado. Não é uma linha por pedido.
- Esse formato append-only é **requisito de auditoria**, com retenção de 5 anos.
  Acordado com compliance em 2025-08-12. Não é decisão de engenharia.
- O faturamento do fechamento soma `valor_centavos` apenas das linhas com
  `status = 'pago'`. Pedido cancelado não é receita.

## O que NÃO se sabe ainda

Estas perguntas são o trabalho do brainstorming — não as responda por conta própria:

- O que exatamente caracteriza uma duplicata neste modelo de dados?
- Onde a correção deve viver: bronze, silver ou na consulta do dashboard?
- Como garantir que a correção não destrua informação legítima?
- O que precisa ser testado para provar que ficou certo?

## Restrições conhecidas

- `bronze` é imutável por contrato. Nenhum `DELETE` nessa camada.
- Sem dependência nova no projeto.
- A política de retenção de 5 anos não está em discussão.

## Ambiente

- Dados de exemplo: `dados/bronze_pedidos.csv` — 17 linhas, recorte de junho
- Código a implementar: `dedup.py`
- Testes: `pytest tests -q`
