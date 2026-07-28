# Hands-on — do chamado vago ao PR revisado

Exercício de 40 minutos que percorre o fluxo inteiro do material numa tarefa real de
engenharia de dados. Roda com Python puro e `pytest`, sem infraestrutura.

**O que se aprende:** que a qualidade da entrega depende da especificação, não do
modelo — e que dois times competentes, com o mesmo agente e o mesmo prompt, entregam
resultados opostos quando um deles não tem a regra de negócio.

## Preparação

Divida a turma em dois grupos:

| | Recebe | Não recebe |
|---|---|---|
| **Grupo A** | `PEDIDO.md`, `dados/`, `dedup.py`, `tests/` | `memory/` |
| **Grupo B** | tudo, inclusive `memory/` | — |

Ninguém abre o `gabarito/`. Os dois grupos usam o mesmo assistente e a mesma
liberdade de uso. **Não avise que os grupos têm material diferente.**

## Roteiro

### 1 · Ler o chamado — 5 min

Abra [`PEDIDO.md`](PEDIDO.md). É todo o contexto que existe.

**Ninguém abre o editor nesta etapa.** Se a mão coçar, é exatamente o hábito que o
exercício ataca.

### 2 · Brainstorming — 10 min

Com o assistente, explore antes de decidir. Se você usa o Superpowers, a skill de
brainstorming conduz sozinha; se não, o pedido abaixo faz o mesmo trabalho:

```
Leia PEDIDO.md e os arquivos desta pasta. Antes de propor qualquer código:
me faça as perguntas que você precisa responder para saber o que é uma
duplicata neste domínio. Uma pergunta por vez. Não escreva código ainda.
```

> **Dica de custo:** se a saída estiver verbosa, ative um modo de compressão de
> resposta (§2). Trinta minutos de conversa exploratória é onde a verbosidade mais
> pesa — e o histórico volta como input em todo turno seguinte.

### 3 · Preencher os artefatos — 10 min

Peça ao assistente que preencha os templates do repositório a partir do que vocês
decidiram:

```
Com base no que definimos, preencha:

1. ../template/docs/specs/TEMPLATE-spec.md  -> docs/specs/<data>-dedup-pedidos.md
2. ../template/.claude/tasks/TEMPLATE-tarefa-agente.md -> a tarefa a delegar

Antes da tarefa, faça a triagem das cinco perguntas do template e me diga
se isso é delegável. Se algum "não" aparecer, pare e me diga qual.
```

**O bloco `Fora de escopo` da spec é o que decide o exercício.** Se ele estiver vazio,
volte à etapa 2.

### 4 · Implementar — 5 min

Implemente [`dedup.py`](dedup.py) — na mão ou delegando com a tarefa que vocês
escreveram.

```bash
pytest hands-on/tests -q
```

### 5 · Review e fechamento — 10 min

Rode os testes **um de cada vez**, na ordem do arquivo, e compare os dois grupos.

Depois, a pergunta que fecha:

> *O Grupo A escreveu código errado — ou escreveu código certo para a especificação
> que tinha?*

## Arquivos

```
PEDIDO.md            o chamado, como chega
dados/               17 linhas de bronze.pedidos
memory/              a regra de negócio  (só o Grupo B)
dedup.py             o que implementar
tests/               5 testes; os 2 primeiros passam com qualquer solução
gabarito/            só para quem conduz
```

## Adaptação de stack

O exercício usa Python puro para rodar em qualquer máquina, mas o erro é idêntico em
todas as stacks — **usar a chave técnica onde a regra pede a chave de negócio**:

| Stack | Onde o erro aparece |
|---|---|
| SQL | `PARTITION BY pedido_id` em vez da tupla completa |
| PySpark | `dropDuplicates(["pedido_id"])` — ou sem `subset` nenhum |
| dbt | `unique_key` do modelo incremental |
| pandas | `drop_duplicates(subset=["pedido_id"])` |

## Referência

Caso narrado, com a discussão completa: **§A.6** do [material](../README.md).
Seções exercitadas: **§3** (spec), **§5** (memória), **§8** (delegação), **§9**
(verificação).
