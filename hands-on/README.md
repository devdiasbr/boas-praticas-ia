# Hands-on — do chamado ao PR, com o fluxo que você já usa

Exercício de 40 minutos numa tarefa real de engenharia de dados. Roda com Python puro e
`pytest`, sem infraestrutura.

**A ideia:** o framework de processo conduz o brainstorming e escreve a spec. Você
valida. Depois preenche o que o framework não cobre — triagem, tarefa de agente e
memória — e executa.

## Insumos

| | |
|---|---|
| [`ESCOPO.md`](ESCOPO.md) | A tarefa: situação, o que se sabe, o que **não** se sabe, restrições |
| [`template/`](template/) | O que o framework não gera: checklist de spec, tarefa de agente, nota de memória |

Destino do que for produzido:

```
saida/docs/specs/        a spec (o framework escreve; você valida)
saida/.claude/tasks/     a tarefa de agente
```

## Roteiro — 40 min

### 1 · Brainstorming — 15 min

Se você usa Superpowers, é uma linha e a skill conduz o resto:

```
/superpowers:brainstorming corrigir a divergência de faturamento descrita
em ESCOPO.md
```

Ela pergunta uma coisa por vez, propõe abordagens, apresenta o design em seções e
**escreve a spec sozinha** ao final.

Sem framework, o mesmo trabalho na mão:

```
Leia ESCOPO.md. Antes de propor qualquer código, me faça as perguntas
em aberto do escopo, uma por vez, até termos as decisões fechadas.
Depois escreva a spec.
```

> **Dica de custo:** ative um modo de compressão de resposta antes de começar.
> Conversa exploratória é onde a verbosidade mais pesa, e cada resposta longa volta
> como entrada em todos os turnos seguintes (§2).

**As decisões que precisam sair daqui:**

- [ ] O que caracteriza uma duplicata neste modelo
- [ ] Em que camada a correção vive
- [ ] O que não pode ser tocado
- [ ] Como se prova que ficou certo

### 2 · Validar a spec — 5 min

**Não reescreva a spec em outro template.** Abra o que o framework gerou e passe pelo
[`template/CHECKLIST-spec.md`](template/CHECKLIST-spec.md).

O item que mais reprova: **`Fora de escopo` vazio**. Se estiver, volte à etapa 1 — o
brainstorming não chegou ao fim.

### 3 · Triagem e tarefa — 10 min

Aqui começa o que o framework não faz.

```
Faça a triagem das cinco perguntas de template/TEMPLATE-tarefa-agente.md
para esta tarefa. Me diga se é delegável e, se algum "não" aparecer,
qual é.

Se for delegável, preencha o template em
saida/.claude/tasks/dedup-pedidos.md usando a spec como base.
```

**A triagem pode dizer "não delega".** É resultado válido — significa que você pilota
no modo assistido, e a tarefa de agente nem chega a existir.

Se a tarefa foi escrita, **aprove antes de executar**. Depois deste ponto o custo de
errar sobe.

### 4 · Implementar — 5 min

Implemente [`dedup.py`](dedup.py) — na mão ou delegando com a tarefa aprovada.

```bash
pytest tests -q
```

### 5 · Verificar e registrar — 5 min

Passe o diff pelo checklist de review de código gerado (§8.4, ou a skill
`revisar-pr-de-agente` do template).

Depois feche o ciclo — a parte que quase todo mundo pula:

```
Usando template/TEMPLATE-memoria.md como formato, escreva a nota do fato
que aprendemos aqui e que o código não conta.
```

## O ponto do exercício

Compare o que ficou em `saida/` com o esforço que deu para produzir. **A spec e a
tarefa não custaram tempo extra** — são o registro de uma conversa que aconteceria de
qualquer forma. A diferença é que agora está escrita, versionada e reutilizável.

E repare no que a etapa 1 evitou: as perguntas em aberto do `ESCOPO.md` têm respostas
que não estão no código. Quem pula direto para o editor responde essas perguntas por
conta própria, sem perceber que estava respondendo.

## Adaptação de stack

Dados em CSV e código em Python puro, para rodar em qualquer máquina. O raciocínio é
idêntico em SQL, PySpark, dbt ou pandas — muda o vocabulário, não a decisão.

## Referência

Caso narrado com a discussão completa: **§A.6** do [material](../README.md).
Seções exercitadas: **§3** (spec), **§5** (memória), **§8** (delegação), **§9**
(verificação).
