# Template de projeto — estrutura de contexto para IA

Esqueleto para copiar no repositório da squad. Tira as regras do "deveríamos seguir" e
coloca no repositório, onde são aplicadas iguais todo dia e entram em code review.

## Se você já usa um framework de processo

Superpowers e similares já cobrem brainstorming, spec, plano de implementação, TDD e
code review. **Este template não compete com isso** — preenche o que eles não cobrem:

| | Framework de processo | Este template |
|---|---|---|
| Brainstorming | ✅ | — |
| Spec / design doc | ✅ escreve sozinho | checklist de validação |
| Plano de implementação | ✅ | — |
| TDD, debugging, code review | ✅ | checklist específico de código gerado |
| **Triagem: delegar ou pilotar** | ❌ | ✅ |
| **Tarefa para agente autônomo** | ❌ | ✅ |
| **Memória entre sessões** | ❌ | ✅ |
| **Arquivo de contexto do projeto** | ❌ | ✅ |

Frameworks de processo assumem que **você** executa, com subagentes. Não tratam de
delegar a um agente autônomo externo nem de persistir conhecimento entre sessões.

## Estrutura

```
CLAUDE.md                              índice enxuto, lido em toda sessão
.claude/
  skills/<nome>/SKILL.md               procedimento nomeado, sob demanda
  tasks/TEMPLATE-tarefa-agente.md      abrir tarefa para agente autônomo
docs/
  specs/CHECKLIST-spec.md              o que validar na spec que o framework gerou
  specs/TEMPLATE-spec.md               só se você não usa framework que gera spec
  adr/TEMPLATE-adr.md                  por que uma decisão técnica foi tomada
memory/
  MEMORY.md                            índice de fatos
  <fato>.md                            um fato por arquivo
```

## O princípio que sustenta a estrutura

**O que é lido sempre precisa ser pequeno. O que é grande precisa ser carregado sob
demanda.**

| Arquivo | Quando entra no contexto | Consequência |
|---|---|---|
| `CLAUDE.md` | **Toda sessão, de todo mundo** | Cada linha custa, todo dia. Menos de 100 linhas |
| `memory/MEMORY.md` | Toda sessão (só o índice) | Uma linha por fato. Podar trimestralmente |
| `memory/<fato>.md` | Quando o índice indica relevância | Pode ser detalhado |
| `.claude/skills/` | Quando a skill é acionada | Descrição curta sempre visível; corpo sob demanda |
| `docs/` | Quando alguém aponta | Sem limite prático |

Um `CLAUDE.md` de 500 linhas parece caprichado e é um imposto silencioso: entra em todo
turno, de toda sessão, de toda pessoa, e ainda disputa atenção com o problema real.

## Como adotar

1. Copie a estrutura para o repositório.
2. Preencha o `CLAUDE.md` — comece pelas **Armadilhas**, é a seção de maior valor.
   Pergunte ao time: *"o que já quebrou alguém que entrou agora?"*
3. Apague o que não se aplica. Seção vazia é pior que ausente.
4. Apague os arquivos de exemplo depois de escrever os seus.
5. Replique o `CLAUDE.md` conforme a ferramenta da squad — `AGENTS.md`, `GEMINI.md`,
   `.cursorrules`. **Mantenha um só arquivo editável** e replique por cópia no CI ou
   link simbólico; duas versões editáveis divergem em semanas.
6. Revise a cada trimestre, junto com a poda da memória.

## Teste de qualidade

Três perguntas em cada linha do `CLAUDE.md`:

1. **Isso se descobre lendo o repositório?** Se sim, apague — o agente lê mais rápido
   que você escreve.
2. **Isso mudaria o comportamento de alguém?** "Escreva código de qualidade" não muda
   nada. "Nunca chame billing direto, o rate limit é compartilhado" muda.
3. **Isso ainda é verdade?** Instrução desatualizada apodrece igual comentário
   mentiroso, e é obedecida com a mesma confiança.

## Referência

Documento completo: [`../README.md`](../README.md).

**Comece pelo Caso A.1**, que percorre uma tarefa real usando estes arquivos em
sequência. É a forma mais rápida de entender para que serve cada diretório.

Seções mais relevantes: **§3** (spec), **§4** (skills e instrução), **§5** (memória),
**§8** (delegação a agente autônomo).
