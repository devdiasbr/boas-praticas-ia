# Roteiro — Como eu uso IA no dia a dia

**Formato:** 30 min de fala + 30 min de conversa · 23 slides
**Objetivo:** a squad sair querendo tentar, não sair com uma lista de ferramentas.

> A meta não é provar economia. É mostrar que **dá para fazer** — e que as três coisas
> que mais mudam resultado não dependem de instalar nada.

---

## Antes de entrar na sala

- [ ] Preencher `<squad>` e `<data>` na capa
- [ ] Link do repositório confere no slide 23
- [ ] Abrir uma sessão real do assistente numa aba, para demonstrar ao vivo se surgir
- [ ] Decidir se o hands-on vem depois — se sim, avisar no fecho
- [ ] Ler as "perguntas que vão vir" no fim deste roteiro

**Se o tempo apertar:** corte os slides 20 e 15, nessa ordem. São os únicos dispensáveis.

---

## Bloco 1 · Abertura — 7 min

### Slide 1 · Capa — 30s
Enquadre em duas frases: não é treinamento de ferramenta, é como você trabalha hoje.
Diga já que metade do tempo é deles.

### Slide 2 · O que esta conversa é — 1 min
**Mensagem:** ninguém está sendo corrigido.
Leia a coluna da esquerda em voz alta — "não é alguém dizendo que vocês estão fazendo
errado". Isso baixa a guarda e o resto flui.

### Slide 3 · Três erros que custam caro — 2 min
**Mensagem:** os três erros eram meus.
Escolha **um** e conte a história real: quando aconteceu, quanto custou.
Sem história, o slide vira lista genérica.

### Slide 4 · O gargalo mudou de lugar — 2 min
**Mensagem central da apresentação.** Se levarem uma frase, é esta.
Pause depois de "quando ninguém decide, o modelo decide".

### Slide 5 · O ciclo — 1,5 min
**Mensagem:** não é cerimônia. Em tarefa pequena, cada etapa leva segundos.
Aponte a etapa 2 — a que mais se pula.

---

## Bloco 2 · Antes de pedir — 6 min

### Slide 6 · Divisor A — 15s
Transição. Não pare aqui.

### Slide 7 · Contexto é orçamento — 3 min
**Mensagem:** as 1.847 linhas irrelevantes disputam atenção com as 6 que importam.
Deixe os dois lados no ar por uns segundos antes de falar. O contraste faz o trabalho.
Não é sobre custo — é sobre qualidade da resposta.

### Slide 8 · Sessão longa apodrece — 2,5 min
**Mensagem:** o bloco de decisões descartadas é o que mais economiza.
Convide a testar hoje mesmo, numa conversa longa que já esteja aberta.

---

## Bloco 3 · Como pedir — 6 min

### Slide 9 · Divisor B — 15s

### Slide 10 · Critério de aceite — 3 min
**Mensagem:** o pedido errado devolve código; o certo devolve código que entra no PR.
Custo de escrever as restrições: 40 segundos. Custo de não escrever: o review inteiro.

### Slide 11 · Plano antes do código — 2,5 min
**Mensagem:** corrigir um plano de 10 linhas custa uma frase.
**Melhor momento para demonstrar ao vivo.** Se tiver a sessão aberta, cole o parágrafo
e mostre o plano aparecendo. É o item mais fácil de copiar.

---

## Bloco 4 · O que persistir — 6 min

### Slide 12 · Divisor C — 15s

### Slide 13 · Arquivo de contexto — 2,5 min
**Mensagem:** se a linha pode ser respondida lendo o README, apague.
Pergunta que levanta conteúdo real: *"o que já quebrou alguém que entrou agora?"*
Anote as respostas — viram o `CLAUDE.md` da squad.

### Slide 14 · Onde mora o que o código não conta — 2,5 min
**Mensagem:** o título é a afirmação, não o tópico.
Regra prática: data absoluta sempre. "Recentemente" apodrece em silêncio.

### Slide 15 · Método dentro da ferramenta — 1 min *(cortável)*
**Mensagem:** disciplina que depende de lembrar, sob prazo, não é disciplina.
Cite o Superpowers como exemplo, não como recomendação fechada.
**Seja honesto:** o processo custa tokens a mais por sessão; o ganho aparece em não
refazer a tarefa.

---

## Bloco 5 · Delegação — 5 min

### Slide 16 · Divisor D — 15s

### Slide 17 · Na mão · piloto · delega — 2,5 min
**Melhor slide para abrir discussão.** Pergunte: *"em qual coluna cai o que vocês
delegam hoje?"*
Feche com: existe teste que prova que ficou certo? Se não existe, não delegue.

### Slide 18 · O PR que passa no CI — 2,5 min
**Conduza como pergunta, não como revelação.** Mostre o diff e deixe a squad achar os
problemas. Só depois revele os três.
O mais grave é o teste antigo invertido — e é o que passa batido em leitura rápida.

---

## Bloco 6 · Limites e fecho — 5 min

### Slide 19 · Onde não usar IA — 2 min
**Mensagem:** saber onde não usar é metade do ganho.
Se a squad lida com dado regulado, pause no último item e abra a conversa.

### Slide 20 · Ferramentas — 1 min *(cortável)*
Passe rápido. É o slide que mais desvia do ponto.
Se perguntarem de Devin: você não usa no dia a dia, mas o critério do slide 17 vale igual.

### Slide 21 · Por onde começar — 2 min
**O pedido concreto:** escolham **uma** das três e tentem essa semana.
Reforce: nenhuma depende de instalar nada.

### Slides 22–23 · Q&A e encerramento
Abra com a terceira pergunta — *"qual tarefa da sprint serviria de teste?"* — se a
conversa travar. É a mais concreta e sempre destrava.

---

## Perguntas que vão vir

**"Isso não é mais trabalho? Escrever spec demora."**
Sim, na primeira vez. Compare com o custo de refazer. Uma tarefa refeita três vezes
custa mais que todas as specs do mês. E a spec vira contexto reutilizável.

**"Meu prompt curto funciona bem."**
Funciona para tarefa pequena e verificável, e está certo assim. O critério é o risco:
mudança de um arquivo, prompt curto resolve. Coisa que vai para produção, não.

**"Qual modelo é melhor?"**
Errada. A pergunta é qual é adequado à tarefa. Classificar e formatar não precisam do
topo de linha — e você ainda espera mais.

**"A IA vai substituir a gente?"**
Escrever código deixou de ser o gargalo; decidir o que construir virou. A segunda parte
é a que ninguém consegue delegar, e é onde vocês valem.

**"Quanto isso economiza?"**
Não vim com esse número — não é o ponto hoje. O que dá para afirmar: retrabalho é o
maior custo, e é onde spec ataca. Se a liderança quiser número, existe um plano de
medição no repositório.

**"Já tentei e a IA me deu código errado."**
Provavelmente deu. A pergunta é se a especificação dizia o suficiente para ela acertar.
É o slide 4.

---

## Se sobrar tempo no Q&A

Proponha o hands-on: 40 minutos, uma tarefa real, a squad passa escopo e template para
o assistente e vê a spec sair da conversa. Está em `hands-on/` no repositório.

É o que transforma "achei interessante" em "usei".
