# Gabarito — só para quem conduz

<!-- Não distribua antes da etapa de review. -->

## A solução

```python
def deduplicar(linhas):
    vistos = {}
    for r in linhas:
        # a chave é de NEGÓCIO, não a chave técnica pedido_id
        chave = (r["pedido_id"], r["status"], r["atualizado_em"])
        anterior = vistos.get(chave)
        if anterior is None or r["ingested_at"] > anterior["ingested_at"]:
            vistos[chave] = r
    return list(vistos.values())


def faturamento_centavos(linhas):
    return sum(int(r["valor_centavos"]) for r in linhas if r["status"] == "pago")
```

Em SQL, a mesma coisa:

```sql
SELECT * EXCEPT (rn) FROM (
  SELECT *, ROW_NUMBER() OVER (
           PARTITION BY pedido_id, status, atualizado_em
           ORDER BY ingested_at DESC) AS rn
  FROM bronze.pedidos
) WHERE rn = 1
```

## O erro que o Grupo A quase sempre entrega

```python
def deduplicar(linhas):
    vistos = {}
    for r in linhas:
        vistos[r["pedido_id"]] = r      # ✕ uma linha por pedido
    return list(vistos.values())
```

**Passa** em `test_remove_reprocessamento_do_lote` e em `test_nao_perde_pedido`.
**Quebra** em `test_preserva_historico_de_status` — mas só porque esse teste existe.

Sem a regra de negócio, ninguém escreve esse teste. E aí o código vai para produção
corrigindo o dashboard e apagando cinco anos de trilha de auditoria.

## Números

| | Valor |
|---|---|
| Linhas em bronze | 17 |
| Linhas com status pago (bruto) | 7 → R$ 970,00 |
| Linhas com status pago (deduplicado) | 5 → **R$ 770,00** |
| Diferença que o financeiro viu | R$ 200,00 |

As duplicatas de reprocessamento são `PED-0002` e `PED-0004`, ambas com
`ingested_at = 2026-06-14T03:00:00`.

`PED-0005` está cancelado: R$ 300,00 que não entram. Quem somar tudo sem filtrar
status chega a R$ 1.070,00 e erra para o outro lado.

## Como conduzir o fechamento

Peça aos dois grupos que rodem os testes **um de cada vez**, na ordem do arquivo. Os
dois primeiros passam para todo mundo — é o momento em que o Grupo A acha que
terminou. O terceiro separa.

Depois, a pergunta que fecha o exercício:

> *"O Grupo A escreveu código errado? Ou escreveu código certo para a especificação
> que tinha?"*

A resposta é a segunda — e é o ponto do §3. O agente não errou; ninguém disse a ele o
que era duplicata neste domínio.
