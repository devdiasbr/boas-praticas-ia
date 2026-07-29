# Roteiro — Como eu uso IA no dia a dia

30 min de fala · 30 min de conversa · 23 slides

As falas em citação são para dizer com suas palavras, não para decorar. Os tempos são
acumulados: se aos 15 min você não está no slide 12, corte o 15 e o 20.

---

## Checklist de 2 minutos antes

- [ ] `<squad>` e `<data>` na capa
- [ ] Sessão do assistente aberta numa aba (demo do slide 11)
- [ ] Link do repositório confere no slide 23
- [ ] Ler a seção "Se travar" no fim deste roteiro

---

# ABERTURA · 0:00 → 7:00

## Slide 1 · Capa — 0:00

> "Isso aqui não é treinamento de ferramenta. É como eu trabalho hoje, o que mudou no
> último ano e o que eu ainda erro.
>
> São 30 minutos meus e 30 de vocês. A parte de vocês é a que interessa — eu quero
> saber onde isso não funciona no contexto de vocês."

Avance rápido. Capa não sustenta plateia.

## Slide 2 · O que esta conversa é — 0:40

Leia a coluna vermelha em voz alta, inteira. A terceira linha é a que importa:

> "**Não é alguém dizendo que vocês estão fazendo errado.** Sério. Eu tropecei em tudo
> que vou mostrar, e alguns tropeços foram caros."

Isso baixa a guarda. Sem isso, o slide 3 soa como acusação.

## Slide 3 · Três erros que custam caro — 1:40

> "Começo pelos meus. Estes três eram meus, e pelas conversas que tive com outras
> squads, não eram só meus."

Leia os três títulos. Pare no que você viveu de verdade e conte:

> "O que mais me pegou foi o segundo. Eu pedia _'otimiza essa função'_ e recebia algo
> que estava certo, mas com async, com o ORM trocado e com a assinatura mudada. Código
> bom, impossível de usar. Eu culpava o modelo — o problema era o meu pedido."

**Se você não tem história para nenhum dos três, corte o slide.** Lista sem história
não convence ninguém.

## Slide 4 · O gargalo mudou de lugar — 3:40

Este é o slide da apresentação inteira. Leia devagar.

> "Escrever código deixou de ser o meu gargalo. Decidir o que deve ser construído virou
> o gargalo."

Pause. Deixe assentar. Depois:

> "E aqui está o problema: quando ninguém decide, o modelo decide. Por omissão, com
> confiança total. E isso só aparece no code review — ou em produção."

## Slide 5 · O ciclo — 5:40

> "Esse é o ciclo que eu sigo hoje. Antes de acharem que é burocracia: em tarefa
> pequena, cada etapa leva segundos. O que muda é o rigor, não os passos."

Aponte a etapa 2:

> "Especificar é a que eu mais pulava. E é a única que, quando falha, estraga todas as
> outras."

**Transição:** _"Vou passar por cada parte. Começando pelo que acontece antes de eu
digitar qualquer coisa."_

---

# ANTES DE PEDIR · 7:00 → 13:00

## Slide 6 · Divisor A — 7:00
Não fale. Só avance.

## Slide 7 · Contexto é orçamento — 7:15

**Mostre o slide e fique quieto uns 3 segundos.** O contraste faz o trabalho.

> "À esquerda, o que eu fazia: colar o log inteiro. Quarenta mil tokens. À direita, o
> mesmo problema em duzentos.
>
> E o ponto não é o custo. É que aquelas mil e oitocentas linhas irrelevantes disputam
> atenção com as seis que importam. Contexto cheio de lixo piora a resposta antes de
> encher a janela."

Se alguém torcer o nariz:

> "Não é sobre economizar. É que a resposta da direita é melhor."

## Slide 8 · Sessão longa apodrece — 10:15

> "Conversa de três horas acumula decisão revogada, tentativa abandonada, arquivo que
> não existe mais. O modelo começa a misturar os estados."

Mostre o prompt de resumo:

> "Eu peço isso antes de abrir sessão nova. E o pedaço que mais me economiza é o das
> **decisões descartadas** — sem ele, a sessão nova propõe de novo tudo que eu já
> tinha recusado."

Convite concreto:

> "Testem hoje. Peguem aquela conversa gigante que está aberta desde ontem e peçam esse
> resumo."

**Transição:** _"Isso era antes de pedir. Agora, o pedido em si — onde eu mais mudei."_

---

# COMO PEDIR · 13:00 → 19:00

## Slide 9 · Divisor B — 13:00

## Slide 10 · Critério de aceite — 13:15

> "À esquerda, o pedido que eu fazia. À direita, o mesmo pedido com três restrições e
> um critério de aceite."

Aponte as restrições:

> "Manter a assinatura. Sem dependência nova. Sem async. Isso levou quarenta segundos
> para escrever — e é exatamente a diferença entre código que eu descarto e código que
> entra no PR."

## Slide 11 · Plano antes do código — 16:15

**Aqui é a demo, se você tiver a aba aberta.** Cole o parágrafo numa tarefa real e
mostre o plano aparecendo.

> "Esse parágrafo é o que mais me poupou retrabalho. Em qualquer tarefa que passa de um
> arquivo, eu peço o plano antes.
>
> Corrigir _'não mexe no serializers, aquilo é contrato público'_ custa uma frase.
> Descobrir isso depois de quatrocentas linhas geradas custa a tarefa inteira."

**Transição:** _"Terceira parte: o que eu não deixo morrer quando a sessão fecha."_

---

# O QUE PERSISTIR · 19:00 → 25:00

## Slide 12 · Divisor C — 19:00

## Slide 13 · Arquivo de contexto — 19:15

> "Esse arquivo é lido em toda sessão, por todo mundo. Então cada linha custa, todo dia."

Compare os dois lados:

> "À esquerda, coisas que o modelo descobre em dois segundos lendo o repositório. À
> direita, coisas que ele nunca vai descobrir sozinho — que `legacy` está congelado, que
> chamar billing direto derruba o rate limit de todo mundo."

**Pergunta para a plateia** — a melhor da apresentação:

> "Qual é a coisa que já quebrou alguém que entrou agora no time de vocês?"

Anote as respostas no quadro. É o `CLAUDE.md` da squad nascendo ali.

## Slide 14 · Onde mora o que o código não conta — 21:45

> "Aqui é o que não está no código: por que a decisão foi tomada, o que a gente
> descartou, a regra que veio do jurídico."

Aponte o contraste:

> "À esquerda, nota de reunião. Seis meses depois não serve para nada. À direita, um
> fato: o que é verdade, por quê, e desde quando.
>
> Duas regras que eu sigo: o título é a afirmação, não o assunto. E data absoluta
> sempre — 'recentemente' apodrece em silêncio."

## Slide 15 · Método dentro da ferramenta — 24:00 *(cortável)*

> "O que mais mudou meu resultado não foi trocar de modelo. Foi o ciclo deixar de ser
> opcional."

Seja honesto, porque a squad vai desconfiar:

> "Isso custa tokens a mais por sessão. O ganho não aparece na conta da sessão —
> aparece em não refazer a tarefa três vezes."

**Transição:** _"Última parte. Vocês usam agente autônomo, então essa é a que mais
importa no dia a dia de vocês."_

---

# DELEGAÇÃO · 25:00 → 30:00

## Slide 16 · Divisor D — 25:00

## Slide 17 · Na mão · piloto · delega — 25:15

Leia as três colunas rápido, depois **devolva a pergunta**:

> "Em qual dessas colunas cai o que vocês estão delegando hoje?"

Deixe responderem. Feche com:

> "A pergunta que resolve quase tudo: existe teste que prova que ficou certo? Se não
> existe, não delega."

## Slide 18 · O PR que passa no CI — 27:00

**Não revele nada.** Mostre e pergunte:

> "Esse PR passou no CI. Alguém acha algum problema?"

Espere. Deixe o silêncio incomodar. Se ninguém falar em 15 segundos:

> "Olhem as duas últimas linhas."

Depois revele:

> "O teste antigo foi invertido para passar. O caso `abc` **deveria** falhar, e o agente
> mudou a asserção em vez de corrigir o código. Esse é o mais grave e o mais fácil de
> passar batido, porque a linha continua verde.
>
> Meu atalho: eu olho o diff dos testes primeiro. Linha alterada em teste existente
> exige justificativa escrita no PR."

## Slide 19 · Onde não usar IA — 29:00

Rápido, quatro itens.

> "Saber onde não usar é metade do ganho."

Pare no último:

> "Dado de cliente e segredo não entram no prompt. Sem exceção de prazo."

Se a squad lida com dado regulado, abra a conversa aqui — vale gastar o tempo.

## Slide 20 · Ferramentas — 30:00 *(cortável)*

Trinta segundos. É o slide que mais desvia.

> "Trocar de ferramenta não resolve problema de método. Pedido ruim é ruim em qualquer
> uma."

Se perguntarem de Devin: você não usa no dia a dia, mas o critério do slide 17 vale igual.

## Slide 21 · Por onde começar — 30:30

> "Se vocês pegarem três coisas daqui, que sejam essas. Nessa ordem — a primeira sozinha
> já muda o resultado."

Leia as três. Feche com o pedido:

> "Escolham **uma** e tentem essa semana. Nenhuma das três depende de instalar nada."

## Slides 22–23 · Q&A — 31:00

> "Trinta minutos. E discordar é o melhor uso desse tempo."

Se ninguém falar, comece pela terceira pergunta do slide — _"qual tarefa da sprint
serviria de teste?"_. É a mais concreta e sempre destrava.

---

# Perguntas que vão vir

**"Isso não é mais trabalho? Escrever spec demora."**
> "Demora na primeira vez. Compare com refazer: uma tarefa refeita três vezes custa mais
> que todas as specs do mês. E a spec vira contexto que o próximo agente reaproveita."

**"Meu prompt curto funciona bem."**
> "E está certo. Para tarefa pequena e verificável, prompt curto resolve. O critério é o
> risco: mudança de um arquivo, tudo bem. Coisa que vai para produção, não."

**"Qual modelo é melhor?"**
> "A pergunta é qual é adequado à tarefa. Classificar e formatar não precisam do topo de
> linha — você paga mais e ainda espera mais."

**"A IA vai substituir a gente?"**
> "Escrever código deixou de ser o gargalo. Decidir o que construir virou. A segunda
> parte é a que ninguém delega, e é onde vocês valem."

**"Quanto isso economiza?"**
> "Não vim com esse número, e não é o ponto hoje. O que dá para afirmar: retrabalho é o
> maior custo, e é onde a spec ataca. Se a liderança quiser número, tem um plano de
> medição no repositório."

**"Já tentei e a IA me deu código errado."**
> "Provavelmente deu mesmo. A pergunta é se a especificação dizia o suficiente para ela
> acertar. É o slide do gargalo."

---

# Se travar

**Plateia calada no Q&A** → vá para a terceira pergunta do slide 22.

**Alguém domina a conversa** → _"boa, quero voltar nisso no fim. Alguém teve experiência
diferente?"_

**Pergunta que você não sabe** → _"não sei. Vou olhar e te respondo."_ É coerente com o
§9 e vale mais que improvisar.

**Estourou o tempo aos 25 min** → pule para o slide 21. Os três itens são o que precisa
sobreviver.

**Sobrou tempo** → proponha o hands-on: 40 minutos, tarefa real, a squad passa escopo e
template para o assistente e vê a spec sair da conversa. Está em `hands-on/`.
