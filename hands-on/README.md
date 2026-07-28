# Hands-on — escopo + template → brainstorming → artefatos preenchidos

Demonstra o fluxo de trabalho do material numa tarefa real de engenharia de dados.
Roda com Python puro e `pytest`, sem infraestrutura.

**A ideia:** você tem dois insumos — o **escopo** da tarefa e o **template** dos
artefatos. Passa os dois para o assistente, faz o brainstorming, e a própria IA
preenche a spec e a tarefa a partir do que foi decidido. Depois implementa e verifica.

O que se demonstra é que **os artefatos não são burocracia manual**: eles saem da
conversa, e a conversa é o trabalho de pensar que aconteceria de qualquer jeito.

## Os dois insumos

| | |
|---|---|
| [`ESCOPO.md`](ESCOPO.md) | A tarefa: situação, o que se sabe, o que **não** se sabe, restrições |
| [`template/`](template/) | Os artefatos em branco: spec, tarefa de agente, nota de memória |

E o destino do que for produzido:

```
saida/docs/specs/        a spec preenchida
saida/.claude/tasks/     a tarefa preenchida
```

## Roteiro — 40 min

### 1 · Brainstorming — 15 min

Abra o assistente na raiz desta pasta e passe os dois insumos:

```
Leia ESCOPO.md e os arquivos de template/.

Vamos fazer brainstorming antes de qualquer código. Me faça as perguntas
em aberto do escopo, uma por vez, até termos as decisões fechadas.
Não escreva código nem preencha nada ainda.
```

Se você usa a skill de brainstorming do Superpowers, chame ela — ela conduz esse
formato sozinha.

> **Dica de custo:** ative um modo de compressão de resposta antes de começar.
> Conversa exploratória é onde a verbosidade mais pesa, e cada resposta longa volta
> como entrada em todos os turnos seguintes (§2).

**As decisões que precisam sair desta etapa:**

- [ ] O que caracteriza uma duplicata neste modelo
- [ ] Em que camada a correção vive
- [ ] O que não pode ser tocado
- [ ] Como se prova que ficou certo

### 2 · A IA preenche os artefatos — 10 min

```
Com base no que decidimos, preencha os templates:

1. template/TEMPLATE-spec.md
   -> saida/docs/specs/2026-XX-XX-dedup-pedidos.md

2. template/TEMPLATE-tarefa-agente.md
   -> saida/.claude/tasks/dedup-pedidos.md

Antes de escrever a tarefa, faça a triagem das cinco perguntas que estão
no próprio template e me diga se isso é delegável. Se aparecer algum
"não", pare e me diga qual.
```

**Revise o que saiu antes de seguir.** Dois pontos onde a spec costuma sair fraca:

- **`Fora de escopo` vazio** — é a seção que mais economiza. Se está vazia, faltou
  brainstorming.
- **Critério de aceite por opinião** — "deve ficar correto" não é critério.
  "`pytest tests -q` verde" é.

### 3 · Implementar — 5 min

Implemente [`dedup.py`](dedup.py), na mão ou delegando com a tarefa que a IA escreveu.

```bash
pytest tests -q
```

### 4 · Verificar e registrar — 10 min

Passe o diff pelo checklist de review de código gerado (§8.4, ou a skill
`revisar-pr-de-agente` do template).

Depois, feche o ciclo: peça à IA que escreva a nota de memória do que ficou
verdadeiro e não está no código.

```
Usando template/TEMPLATE-memoria.md como formato, escreva a nota do fato
que aprendemos aqui e que o código não conta.
```

## O ponto do exercício

Ao final, compare o que você tem em `saida/` com o esforço que deu para produzir.
A spec e a tarefa não custaram tempo extra: **elas são o registro de uma conversa que
precisaria acontecer de qualquer forma.** A diferença é que agora ela está escrita,
versionada e reutilizável.

E repare no que a etapa 1 evitou. As perguntas em aberto do `ESCOPO.md` têm respostas
que não estão no código — o que é duplicata neste modelo depende de uma decisão de
compliance de 2025. Quem pula direto para o editor responde essas perguntas por
conta própria, sem saber que estava respondendo.

## Adaptação de stack

Os dados são CSV e o código é Python puro para rodar em qualquer máquina. O raciocínio
é idêntico em SQL, PySpark, dbt ou pandas — muda o vocabulário, não a decisão.

## Referência

Caso narrado com a discussão completa: **§A.6** do [material](../README.md).
Seções exercitadas: **§3** (spec), **§5** (memória), **§8** (delegação), **§9**
(verificação).
