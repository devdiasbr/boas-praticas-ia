# Dedup Faturamento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar `deduplicar()` e `faturamento_centavos()` em `hands-on/dedup.py` para que o faturamento de junho bata com o fechamento contábil (R$ 770,00).

**Architecture:** Duas funções puras, stdlib apenas. `deduplicar()` agrupa linhas por `(pedido_id, status, atualizado_em)` e mantém, por grupo, a linha de menor `ingested_at`, preservando a ordem original das linhas restantes. `faturamento_centavos()` soma `valor_centavos` das linhas com `status == 'pago'` já deduplicadas.

**Tech Stack:** Python puro (stdlib), pytest.

## Global Constraints

- Sem dependência nova no projeto (spec).
- `bronze` é imutável — nenhuma mudança em `dados/bronze_pedidos.csv` (spec).
- Não mudar as assinaturas de `deduplicar(linhas: List[Linha]) -> List[Linha]` e `faturamento_centavos(linhas: List[Linha]) -> int` (dedup.py, comentário do arquivo).
- Testes existentes em `hands-on/tests/test_dedup.py` não devem ser alterados — são a definição de "certo" (spec, seção "Testes que provam correção").

---

### Task 1: `deduplicar()` — remove duplicata de reprocessamento, preserva histórico

**Files:**
- Modify: `hands-on/dedup.py` (função `deduplicar`, linhas 14-23)
- Test: `hands-on/tests/test_dedup.py` (já existe, não modificar — roda como acceptance)

**Interfaces:**
- Consumes: nada de outra task.
- Produces: `deduplicar(linhas: List[Dict[str,str]]) -> List[Dict[str,str]]`, usada por Task 2 e pelos testes de `faturamento_centavos`.

- [ ] **Step 1: Rodar os testes que Task 1 precisa fazer passar, confirmando que falham hoje**

Run: `pytest hands-on/tests/test_dedup.py::test_remove_reprocessamento_do_lote hands-on/tests/test_dedup.py::test_nao_perde_pedido hands-on/tests/test_dedup.py::test_preserva_historico_de_status -v`

Expected: as 3 dão erro (`NotImplementedError: implementar deduplicar()`).

- [ ] **Step 2: Implementar `deduplicar()`**

Editar `hands-on/dedup.py`:

```python
# -*- coding: utf-8 -*-
"""
Transformacao bronze -> silver do pipeline de pedidos.

Nao mude as assinaturas: os testes dependem delas.
"""
from typing import Dict, List

Linha = Dict[str, str]


def deduplicar(linhas: List[Linha]) -> List[Linha]:
    """
    Remove duplicatas geradas por reprocessamento de lote.

    Duas linhas sao a mesma transicao de status quando tem
    (pedido_id, status, atualizado_em) identicos. Dentro de cada grupo,
    mantem a linha de menor ingested_at (o registro original, nao a copia
    gerada pelo reprocessamento). Ordem relativa das linhas restantes e
    preservada.
    """
    melhor_por_chave: Dict[tuple, Linha] = {}
    for linha in linhas:
        chave = (linha["pedido_id"], linha["status"], linha["atualizado_em"])
        atual = melhor_por_chave.get(chave)
        if atual is None or linha["ingested_at"] < atual["ingested_at"]:
            melhor_por_chave[chave] = linha

    vistos = set()
    resultado = []
    for linha in linhas:
        chave = (linha["pedido_id"], linha["status"], linha["atualizado_em"])
        if chave in vistos:
            continue
        vistos.add(chave)
        resultado.append(melhor_por_chave[chave])
    return resultado


def faturamento_centavos(linhas: List[Linha]) -> int:
    """
    Soma o faturamento, em centavos, das linhas ja deduplicadas.

    TODO: implementar.
    """
    raise NotImplementedError("implementar faturamento_centavos()")
```

- [ ] **Step 3: Rodar os testes de novo, confirmar que passam**

Run: `pytest hands-on/tests/test_dedup.py::test_remove_reprocessamento_do_lote hands-on/tests/test_dedup.py::test_nao_perde_pedido hands-on/tests/test_dedup.py::test_preserva_historico_de_status -v`

Expected: PASS nas 3.

- [ ] **Step 4: Commit**

```bash
git add hands-on/dedup.py
git commit -m "feat: implementa deduplicar() por chave pedido_id+status+atualizado_em"
```

---

### Task 2: `faturamento_centavos()` — soma pago, bate com fechamento

**Files:**
- Modify: `hands-on/dedup.py` (função `faturamento_centavos`, ao final do arquivo escrito na Task 1)
- Test: `hands-on/tests/test_dedup.py` (já existe, não modificar)

**Interfaces:**
- Consumes: `deduplicar()` da Task 1 (usada dentro dos testes, não dentro desta função).
- Produces: `faturamento_centavos(linhas: List[Dict[str,str]]) -> int`.

- [ ] **Step 1: Rodar os testes que Task 2 precisa fazer passar, confirmando que falham hoje**

Run: `pytest hands-on/tests/test_dedup.py::test_faturamento_bate_com_fechamento hands-on/tests/test_dedup.py::test_cancelado_nao_entra_no_faturamento -v`

Expected: as 2 dão erro (`NotImplementedError: implementar faturamento_centavos()`).

- [ ] **Step 2: Implementar `faturamento_centavos()`**

Substituir o corpo da função em `hands-on/dedup.py`:

```python
def faturamento_centavos(linhas: List[Linha]) -> int:
    """
    Soma o faturamento, em centavos, das linhas ja deduplicadas.

    Considera apenas linhas com status == 'pago'. A chave de dedup
    (pedido_id, status, atualizado_em) garante no maximo uma linha 'pago'
    por transicao real, entao a soma nao duplica receita.
    """
    return sum(
        int(linha["valor_centavos"])
        for linha in linhas
        if linha["status"] == "pago"
    )
```

- [ ] **Step 3: Rodar toda a suíte de testes**

Run: `pytest hands-on/tests -q`

Expected: `5 passed`.

- [ ] **Step 4: Commit**

```bash
git add hands-on/dedup.py
git commit -m "feat: implementa faturamento_centavos() somando linhas pago"
```

---

## Self-Review

**Cobertura da spec:** chave de dedup (Task 1 Step 2), camada bronze->silver (nada em `dedup.py` toca `dados/bronze_pedidos.csv`, só lê), critério de desempate menor `ingested_at` (Task 1 Step 2), soma `pago` (Task 2 Step 2), suíte existente sem alteração (constraint global + ambas tasks rodam os mesmos 5 testes do arquivo original). Sem gaps.

**Placeholders:** nenhum `TBD`/`TODO` deixado no código final — o `TODO` original de `faturamento_centavos` é substituído na Task 2 Step 2.

**Consistência de tipos:** `Linha = Dict[str, str]` mantido; assinaturas de `deduplicar` e `faturamento_centavos` inalteradas nas duas tasks.
