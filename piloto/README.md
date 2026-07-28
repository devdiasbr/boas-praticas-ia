# Piloto de adoção — uso instrumentado de IA

**Squad:** `<squad>` · **Repositório:** `<repo>` · **Stack:** `<stack>`
**Responsável:** `<nome>` · **Período:** `<AAAA-MM-DD>` a `<AAAA-MM-DD>` (4 semanas)
**Status:** `<Proposto | Em execução | Concluído>`

---

## 1. Problema

Temos um material de boas práticas de uso de IA e um template de estrutura de
projeto. Ambos são bem fundamentados e **nenhum dos dois foi medido em casa**.

Hoje as afirmações que sustentam a adoção são de três tipos:

| Tipo | Exemplo | Confiabilidade |
|---|---|---|
| Princípio | "Contexto inchado piora a resposta" | Alta — mecanismo conhecido |
| Estimativa de mercado | "Ferramenta X reduz N% de token" | **Baixa** — número publicado pelo fornecedor |
| Percepção do time | "Está me ajudando bastante" | **Nenhuma** — autodeclarada |

Nenhuma delas responde a pergunta que a liderança vai fazer: *quanto custa e quanto
entrega, aqui, no nosso repositório?*

Sem esse número, qualquer discussão sobre expandir ou cortar investimento em IA é
uma disputa de opinião — e quem tiver mais convicção vence, não quem tiver razão.

## 2. Objetivo

Produzir, em 4 semanas e com uma squad, **evidência medida** sobre custo e qualidade
do uso de IA, e validar se a estrutura proposta sobrevive ao contato com um projeto
real.

Não é objetivo deste piloto provar que a IA vale a pena. É descobrir se vale, e onde.

## 3. Hipóteses

Escritas de forma **falsificável** e antes da coleta, para não virarem racionalização
depois. Cada uma pode dar errado, e dar errado é resultado válido.

| # | Hipótese | Como falsifica |
|---|---|---|
| H1 | Escrever spec antes reduz retrabalho | Taxa de retrabalho não cai, ou sobe |
| H2 | O custo por tarefa entregue cai com a estrutura adotada | Custo por tarefa fica igual ou sobe |
| H3 | O ganho de implementação não é anulado pelo tempo de review | Tempo de review sobe mais do que a implementação cai |
| H4 | O `CLAUDE.md` reduz reexplicação de contexto | Volume de contexto colado à mão por sessão não cai |
| H5 | Tarefa delegada com triagem tem aproveitamento maior que sem | Taxa de PR aproveitado não melhora |

> **Aviso metodológico:** não defina meta numérica agora. Meta antes de baseline é
> chute que depois vira pressão para atingir o número em vez de medir a realidade.
> As metas saem ao fim da Semana 2, a partir do baseline real.

## 4. Escopo

```
IN:  1 squad · 1 repositório · 4 semanas
     Instrumentação de custo (leitura dos arquivos de sessão locais)
     Adoção do template: CLAUDE.md, memory/, primeira spec, primeira tarefa delegada
     Coleta semanal das métricas da seção 6

OUT: Mais de uma squad          ← escala depois do resultado, não antes
     Mudança de ferramenta ou de modelo padrão no meio do piloto
     Compra ou contratação de qualquer coisa nova
     Código sensível (auth, pagamento, dado pessoal) como alvo de delegação
     Comparação entre pessoas   ← mede-se o processo, nunca o indivíduo
```

> **Sobre o último item:** se qualquer pessoa da squad suspeitar que a medição é
> avaliação individual disfarçada, os dados ficam inúteis — o comportamento muda para
> agradar a métrica. Deixe explícito, na primeira reunião, que a unidade de análise é
> a tarefa, não a pessoa, e que nenhum dado individual será reportado.

## 5. Desenho — 4 semanas

### Semanas 1–2 · Baseline

**Muda uma coisa só: a instrumentação.** Nenhuma prática nova, nenhum template,
nenhuma ferramenta de compressão. O time trabalha como sempre trabalhou.

É a etapa que todos querem pular e sem a qual o resto não significa nada. Não existe
"medir depois e comparar com a lembrança de como era".

> **Atalho possível:** os assistentes já gravam as sessões em disco. Se o time usa IA
> há alguns meses, o baseline **já existe** — rode `npx codeburn overview` e
> `npx codeburn optimize` e você tem o retrato retroativo sem esperar duas semanas.
> Nesse caso, congele o baseline com `export` e comece direto pela Semana 3.
> Como ler a saída: §12 do [material](../README.md).

- [ ] Instrumentação instalada na máquina de cada pessoa da squad
- [ ] Primeira coleta ao fim da Semana 1 (valida que o dado está chegando)
- [ ] Coleta consolidada ao fim da Semana 2
- [ ] **Metas definidas agora**, a partir do baseline real

### Semana 3 · Estrutura

- [ ] `CLAUDE.md` preenchido no repositório — comece pelas **Armadilhas**
- [ ] `memory/MEMORY.md` com no mínimo 5 fatos reais de negócio
- [ ] Uma spec escrita no template, para uma tarefa que já ia ser feita
- [ ] Uma tarefa delegada a agente autônomo, com a **triagem de 5 perguntas feita e
      registrada** — inclusive se o resultado for "não delega"

> Registrar uma triagem que resultou em "não delega" é tão valioso quanto uma
> delegação bem-sucedida: mostra que o critério está sendo aplicado, não contornado.

### Semana 4 · Medição e fechamento

- [ ] Review do PR delegado com o checklist da skill `revisar-pr-de-agente`
- [ ] Coleta final e comparação com o baseline
- [ ] Caso escrito ponta a ponta, no formato do Apêndice A
- [ ] Retrospectiva de 1 hora com a squad — o que atrapalhou, o que ninguém usou
- [ ] Decisão registrada: expandir, ajustar ou parar

## 6. O que medir

| Métrica | Fonte | Frequência | Por que importa |
|---|---|---|---|
| Input / output / cache **separados** | Instrumentação | Semanal | Misturar os três esconde qual prática teve efeito |
| **Custo por tarefa entregue** | Instrumentação + tracker | Semanal | A métrica principal. Custo total sobe com adoção; por tarefa, não |
| **Taxa de acerto de primeira** | Instrumentação | Semanal | **Detector de regressão.** Se cair, a economia está custando qualidade |
| Taxa de retrabalho | Manual | Semanal | Quantas vezes a mesma tarefa voltou |
| Taxa de aproveitamento de PR de agente | Manual | Por PR | Aceito sem retrabalho / total |
| Tempo de review | Manual | Por PR | O custo que se desloca e ninguém contabiliza |
| Lead time até produção | Tracker | Semanal | Juiz final. Mede o fluxo, não a etapa |

**Não colete:** linhas de código geradas · número de prompts · percentual de código
escrito por IA · tempo economizado autodeclarado. Medem movimento, não valor — e
pioram assim que viram meta.

Planilha de coleta: [`coleta.md`](coleta.md).

## 7. Critério de sucesso e regra de parada

**Sucesso** — as três condições, juntas:

1. Custo por tarefa entregue **cai** em relação ao baseline
2. Taxa de acerto de primeira **não piora**
3. Lead time até produção **não piora**

**Regra de parada — decidida antes de começar:**

> Se o custo cair mas a taxa de acerto de primeira **ou** o lead time piorarem, a
> conclusão é **"transferiu custo, não eliminou"**. Isso vai para o relatório com a
> mesma clareza que um resultado positivo iria.

**Piloto que só pode dar certo não é piloto — é demonstração.** Se ao fim das 4
semanas a resposta for "não compensou como esperávamos", o piloto funcionou: custou
uma squad e um mês, e não a organização inteira e um ano.

## 8. Riscos à validade

Os três primeiros são os que mais estragam piloto de IA, e todos empurram o resultado
para o lado otimista.

| Risco | Como se manifesta | Mitigação |
|---|---|---|
| **Efeito novidade** | Todo mundo caprichado nas 2 primeiras semanas de uso | Baseline **antes** de qualquer mudança; olhar a tendência, não o pico |
| **Seleção de tarefa fácil** | Só as tarefas boas viram exemplo | Registre **toda** tarefa do período, inclusive as que deram errado |
| **Efeito observador** | Comportamento muda porque está sendo medido | Deixar explícito que a unidade é a tarefa, nunca a pessoa |
| **Variável confundida** | Adota 4 coisas juntas e não sabe qual funcionou | Só a estrutura na Semana 3. Compressão e outras camadas ficam para depois |
| **Amostra pequena** | 4 semanas de uma squad não é estatística | Trate como **indício direcional**, não prova. Escreva assim no relatório |
| **Semana atípica** | Feriado, incidente, release grande | Anote no diário de coleta. Contexto sem anotação vira ruído inexplicável |

## 9. Entregáveis

1. **Relatório de 2 páginas** — baseline, resultado, o que confirmou e o que não
   confirmou cada hipótese. Com os números, não com adjetivos.
2. **`CLAUDE.md` e `memory/` reais** no repositório, sobreviventes a 2 semanas de uso.
3. **Um caso ponta a ponta** no formato do Apêndice A, substituindo um caso
   ilustrativo do documento.
4. **Lista de correções ao material** — o que o contato com a realidade mostrou que
   está errado, faltando ou é impraticável. Este entregável costuma ser o mais útil.

## 10. Papéis

| Papel | Quem | Responsabilidade |
|---|---|---|
| Condutor | `<nome>` | Coleta semanal, consolidação, relatório |
| Squad | `<time>` | Trabalha normalmente; aplica a estrutura a partir da Semana 3 |
| Patrocinador | `<lideranca>` | Garante que o piloto não seja interrompido no meio |
| Revisor técnico | `<nome>` | Review dos PRs delegados com o checklist |

**O papel do patrocinador é o mais subestimado.** Piloto interrompido na Semana 3 por
demanda urgente não gera dado nenhum — gera a impressão de que "tentamos e não deu",
que é o pior resultado possível porque bloqueia a próxima tentativa.

## 11. O que fazer com o resultado

| Resultado | Ação |
|---|---|
| Sucesso nas 3 condições | Expandir para 2–3 squads. Repetir o desenho, sem pular o baseline |
| Custo cai, qualidade cai | Identificar qual prática causou. Manter o resto, remover a culpada |
| Nada muda | Investigar se a estrutura foi de fato usada. Ferramenta instalada ≠ prática adotada |
| Piora | Reverter e documentar. **É o resultado mais valioso do conjunto** — evita o rollout caro |

---

*Formato baseado no template de spec deste repositório. Métricas conforme §12 e §15
do [material de boas práticas](../README.md). Criado em 2026-07-28.*
