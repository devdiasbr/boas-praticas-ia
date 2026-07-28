const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.3 x 7.5
pres.author = "Bruno Dias";
pres.title = "Como eu uso IA no dia a dia";

const W = 13.3, H = 7.5, M = 0.7;

const C = {
  dark:   "1A1D23",
  darkAlt:"262B33",
  text:   "22262E",
  muted:  "6B7280",
  light:  "FFFFFF",
  soft:   "F4F5F7",
  teal:   "0F766E",
  tealLt: "D7EDEA",
  red:    "B3261E",
  redLt:  "FBE9E7",
  green:  "2C6E49",
  greenLt:"E4F0E8",
};

const FT = "Cambria";   // titulos
const FB = "Calibri";   // corpo
const FM = "Courier New";

let n = 0;

// ---------- helpers ----------

function titulo(s, txt, opt) {
  opt = opt || {};
  s.addText(txt, {
    x: M, y: opt.y || 0.5, w: W - 2 * M, h: 0.85,
    fontFace: FT, fontSize: opt.size || 34, bold: true,
    color: opt.color || C.text, align: "left", margin: 0,
  });
}

function subtitulo(s, txt, y, color) {
  s.addText(txt, {
    x: M, y: y, w: W - 2 * M, h: 0.4,
    fontFace: FB, fontSize: 15, color: color || C.muted,
    align: "left", margin: 0, italic: true,
  });
}

// motivo visual: numero em circulo teal, canto inferior direito
function selo(s, dark) {
  n += 1;
  s.addShape(pres.ShapeType.ellipse, {
    x: W - 0.95, y: H - 0.85, w: 0.42, h: 0.42,
    fill: { color: dark ? C.teal : C.tealLt },
  });
  s.addText(String(n), {
    x: W - 0.95, y: H - 0.85, w: 0.42, h: 0.42,
    fontFace: FB, fontSize: 11, bold: true,
    color: dark ? C.light : C.teal,
    align: "center", valign: "middle", margin: 0,
  });
}

function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill }, rectRadius: 0.08,
    line: { color: o.line || o.fill, width: 1 },
  });
}

function bloco(s, o) {
  // cartao com cabecalho (marcador + titulo) e corpo em mono ou texto
  card(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: o.fill, line: o.line });
  s.addText(o.marca + "  " + o.titulo, {
    x: o.x + 0.28, y: o.y + 0.2, w: o.w - 0.56, h: 0.38,
    fontFace: FB, fontSize: 15, bold: true, color: o.cor, margin: 0,
  });
  s.addText(o.corpo, {
    x: o.x + 0.28, y: o.y + 0.68, w: o.w - 0.56, h: o.h - 0.95,
    fontFace: o.mono ? FM : FB, fontSize: o.size || 11.5,
    color: C.text, margin: 0, valign: "top", lineSpacing: o.mono ? 15 : 18,
  });
}

function rodape(s, txt) {
  s.addText(txt, {
    x: M, y: H - 0.78, w: W - 2.2, h: 0.4,
    fontFace: FB, fontSize: 12.5, color: C.muted, margin: 0, italic: true,
  });
}

function novo(dark) {
  const s = pres.addSlide();
  s.background = { color: dark ? C.dark : C.light };
  return s;
}

function secao(numero, titolo, sub) {
  const s = novo(true);
  s.addShape(pres.ShapeType.ellipse, {
    x: M, y: 2.5, w: 1.15, h: 1.15, fill: { color: C.teal },
  });
  s.addText(numero, {
    x: M, y: 2.5, w: 1.15, h: 1.15,
    fontFace: FT, fontSize: 40, bold: true, color: C.light,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText(titolo, {
    x: M + 1.6, y: 2.55, w: W - M - 2.3, h: 0.9,
    fontFace: FT, fontSize: 38, bold: true, color: C.light, margin: 0,
  });
  s.addText(sub, {
    x: M + 1.6, y: 3.5, w: W - M - 2.3, h: 0.5,
    fontFace: FB, fontSize: 16, color: "9AA4B2", margin: 0, italic: true,
  });
  selo(s, true);
  return s;
}

// ============ 1. CAPA ============
{
  const s = novo(true);
  s.addText("Como eu uso IA", {
    x: M, y: 2.05, w: 9.5, h: 0.95,
    fontFace: FT, fontSize: 48, bold: true, color: C.light, margin: 0,
  });
  s.addText("no dia a dia", {
    x: M, y: 2.95, w: 9.5, h: 0.95,
    fontFace: FT, fontSize: 48, bold: true, color: C.teal, margin: 0,
  });
  s.addText("O que mudou no meu jeito de trabalhar — e o que eu ainda erro", {
    x: M, y: 4.05, w: 9.5, h: 0.5,
    fontFace: FB, fontSize: 17, color: "9AA4B2", margin: 0,
  });
  s.addText("Bruno Dias  ·  <squad>  ·  <data>", {
    x: M, y: H - 1.15, w: 8, h: 0.4,
    fontFace: FB, fontSize: 13, color: C.muted, margin: 0,
  });
  s.addNotes("Enquadramento: isto nao e treinamento de ferramenta. E como eu trabalho hoje. Metade do tempo e de voces — 30 min de fala, 30 de conversa.");
  n = 0; // capa nao entra na contagem
}

// ============ 2. O QUE ISSO E / NAO E ============
{
  const s = novo();
  titulo(s, "O que esta conversa é");
  const y = 1.85, h = 2.05;
  bloco(s, {
    x: M, y: y, w: 5.85, h: h, fill: C.redLt, line: "F2C8C4",
    marca: "✕", cor: C.red, titulo: "O que NÃO é",
    corpo: "Treinamento de ferramenta.\n\nLista de prompts mágicos.\n\nAlguém dizendo que vocês estão fazendo errado.",
    size: 13.5,
  });
  bloco(s, {
    x: M + 6.15, y: y, w: 5.85, h: h, fill: C.greenLt, line: "C6DECF",
    marca: "✓", cor: C.green, titulo: "O que é",
    corpo: "Como eu trabalho hoje, na prática.\n\nO que me custou caro aprender.\n\nO que vocês podem roubar de mim já na segunda.",
    size: 13.5,
  });
  s.addText("Se no fim vocês discordarem de mim, ótimo — é para isso que reservei metade do tempo.", {
    x: M, y: 4.6, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 16, color: C.text, margin: 0, italic: true,
  });
  selo(s);
  s.addNotes("Baixar a guarda da plateia. Ninguem gosta de ser corrigido em publico. Deixar claro que e experiencia, nao auditoria.");
}

// ============ 3. O QUE EU FAZIA ERRADO ============
{
  const s = novo();
  titulo(s, "Começo pelo que eu fazia errado");
  subtitulo(s, "Os três erros que me custaram mais tempo", 1.42);

  const itens = [
    ["Colava tudo",       "Log inteiro, arquivo inteiro, “por precaução”.\nAchava que mais contexto = melhor resposta."],
    ["Pedia vago",        "“Otimiza isso aí.”\nRecebia algo legítimo que eu não podia usar."],
    ["Aceitava o que vinha", "Estava bem escrito, parecia certo.\nEu não rodava. Descobria no review — ou em produção."],
  ];
  let y = 2.0;
  itens.forEach((it, i) => {
    s.addShape(pres.ShapeType.ellipse, { x: M, y: y, w: 0.5, h: 0.5, fill: { color: C.redLt } });
    s.addText(String(i + 1), {
      x: M, y: y, w: 0.5, h: 0.5, fontFace: FB, fontSize: 14, bold: true,
      color: C.red, align: "center", valign: "middle", margin: 0,
    });
    s.addText(it[0], {
      x: M + 0.75, y: y - 0.02, w: 3.2, h: 0.4,
      fontFace: FB, fontSize: 17, bold: true, color: C.text, margin: 0,
    });
    s.addText(it[1], {
      x: M + 4.0, y: y - 0.05, w: 7.6, h: 0.85,
      fontFace: FB, fontSize: 13.5, color: C.muted, margin: 0, lineSpacing: 18,
    });
    y += 1.25;
  });
  rodape(s, "Nenhum desses erros é sobre a ferramenta. Os três são sobre mim.");
  selo(s);
  s.addNotes("Contar um caso real curto de um dos tres. Vulnerabilidade primeiro: abre a plateia para o resto.");
}

// ============ 4. A VIRADA ============
{
  const s = novo(true);
  s.addText("A virada", {
    x: M, y: 1.15, w: 8, h: 0.8,
    fontFace: FT, fontSize: 34, bold: true, color: C.light, margin: 0,
  });
  s.addText("Escrever código deixou de ser o meu gargalo.", {
    x: M, y: 2.15, w: 11.9, h: 0.6,
    fontFace: FT, fontSize: 27, color: C.light, margin: 0,
  });
  s.addText("Decidir o que deve ser construído virou o gargalo.", {
    x: M, y: 2.85, w: 11.9, h: 0.6,
    fontFace: FT, fontSize: 27, bold: true, color: C.teal, margin: 0,
  });
  s.addText(
    "Quando eu não decido, o modelo decide por mim — por omissão, com confiança, e eu só descubro no code review.",
    { x: M, y: 4.1, w: 11.3, h: 0.9, fontFace: FB, fontSize: 16, color: "9AA4B2", margin: 0, lineSpacing: 24 }
  );
  selo(s, true);
  s.addNotes("Este e o slide central. Se levarem so uma frase daqui, e esta.");
}

// ============ 5. MEU CICLO ============
{
  const s = novo();
  titulo(s, "Meu ciclo hoje");
  subtitulo(s, "O mesmo, de tarefa pequena a feature grande — só muda o rigor de cada etapa", 1.42);

  const passos = [
    ["ENTENDO",  "leio antes\nde pedir"],
    ["ESPECIFICO","escrevo o\ncritério"],
    ["EXECUTO",  "eu ou o\nagente"],
    ["VERIFICO", "rodo, não\nleio"],
    ["REGISTRO", "o que vale\npra próxima"],
  ];
  const bw = 2.15, gap = 0.35, y = 2.35;
  let x = (W - (passos.length * bw + (passos.length - 1) * gap)) / 2;
  passos.forEach((p, i) => {
    card(s, { x: x, y: y, w: bw, h: 1.75, fill: i === 1 ? C.teal : C.soft, line: i === 1 ? C.teal : "E2E5EA" });
    s.addText(p[0], {
      x: x, y: y + 0.3, w: bw, h: 0.35,
      fontFace: FB, fontSize: 13, bold: true,
      color: i === 1 ? C.light : C.text, align: "center", margin: 0,
    });
    s.addText(p[1], {
      x: x, y: y + 0.75, w: bw, h: 0.75,
      fontFace: FB, fontSize: 11.5,
      color: i === 1 ? "D7EDEA" : C.muted, align: "center", margin: 0, lineSpacing: 15,
    });
    if (i < passos.length - 1) {
      s.addText("→", {
        x: x + bw, y: y + 0.6, w: gap, h: 0.5,
        fontFace: FB, fontSize: 17, color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
    x += bw + gap;
  });
  s.addText("A etapa 2 é a que eu mais pulava — e é a única que, quando falha, estraga todas as outras.", {
    x: M, y: 4.6, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 15.5, color: C.text, margin: 0, italic: true,
  });
  rodape(s, "Antes: eu ia direto de “tenho um problema” para “escreve o código”.");
  selo(s);
  s.addNotes("Mostrar que o ciclo nao e cerimonia: em tarefa pequena cada etapa leva segundos.");
}

// ============ 6. SECAO A ============
secao("A", "Antes de pedir", "A parte que acontece antes de eu digitar qualquer coisa");

// ============ 7. CONTEXTO E ORCAMENTO ============
{
  const s = novo();
  titulo(s, "Contexto é orçamento, não depósito");
  const y = 1.7, h = 3.15;
  bloco(s, {
    x: M, y: y, w: 5.85, h: h, fill: C.redLt, line: "F2C8C4", mono: true,
    marca: "✕", cor: C.red, titulo: "Como eu fazia",
    corpo:
      "Aqui o log, me ajuda:\n\n" +
      "09:14:02 INFO  Starting worker\n" +
      "09:14:02 INFO  Connected redis\n" +
      "  ... (1.847 linhas) ...\n" +
      "09:31:55 ERROR ValueError: inva\n" +
      "  ... (mais 600 linhas) ...",
  });
  bloco(s, {
    x: M + 6.15, y: y, w: 5.85, h: h, fill: C.greenLt, line: "C6DECF", mono: true,
    marca: "✓", cor: C.green, titulo: "Como eu faço",
    corpo:
      "Erro no worker, ~2% dos registros.\n\n" +
      "ValueError: invalid literal\n" +
      "  parser.py:42 in parse_row\n\n" +
      "Já verifiquei: CSV tem células\n" +
      "vazias. Schema não é meu.\n\n" +
      "Quero vazio -> None, sem engolir\n" +
      "outros erros.",
  });
  s.addText("~40.000 tokens", {
    x: M, y: y + h + 0.15, w: 5.85, h: 0.45,
    fontFace: FB, fontSize: 20, bold: true, color: C.red, align: "center", margin: 0,
  });
  s.addText("~200 tokens · e resposta melhor", {
    x: M + 6.15, y: y + h + 0.15, w: 5.85, h: 0.45,
    fontFace: FB, fontSize: 20, bold: true, color: C.green, align: "center", margin: 0,
  });
  selo(s);
  s.addNotes("O ponto nao e o custo: e que as 1.847 linhas irrelevantes disputam atencao com as 6 que importam.");
}

// ============ 8. SESSAO NOVA ============
{
  const s = novo();
  titulo(s, "Sessão longa apodrece");
  subtitulo(s, "Conversa de 3 horas acumula decisão revogada, tentativa abandonada e arquivo velho", 1.42);

  card(s, { x: M, y: 2.1, w: W - 2 * M, h: 1.95, fill: C.soft, line: "E2E5EA" });
  s.addText("O que eu peço antes de abrir sessão nova:", {
    x: M + 0.35, y: 2.3, w: 10, h: 0.35,
    fontFace: FB, fontSize: 14, bold: true, color: C.text, margin: 0,
  });
  s.addText(
    "“Escreva um resumo de estado em até 20 linhas: decisões tomadas e o porquê,\n" +
    "decisões que DESCARTAMOS e o motivo, arquivos alterados, o que está pendente.”",
    { x: M + 0.35, y: 2.75, w: 11.5, h: 1.0, fontFace: FM, fontSize: 12.5, color: C.text, margin: 0, lineSpacing: 19 }
  );
  s.addText("~90.000 tokens de histórico  →  ~600 de estado útil", {
    x: M, y: 4.35, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 19, bold: true, color: C.teal, margin: 0,
  });
  s.addText(
    "O bloco de decisões descartadas é o que mais me economiza: sem ele, a sessão nova propõe de novo tudo que eu já tinha recusado.",
    { x: M, y: 5.0, w: 11.6, h: 0.7, fontFace: FB, fontSize: 14.5, color: C.muted, margin: 0, lineSpacing: 20 }
  );
  selo(s);
  s.addNotes("Sugerir que testem hoje mesmo numa conversa longa que ja esteja aberta.");
}

// ============ 9. SECAO B ============
secao("B", "Como eu peço", "Onde eu mais mudei — e onde o retorno é mais rápido");

// ============ 10. CRITERIO DE ACEITE ============
{
  const s = novo();
  titulo(s, "O critério de aceite vai junto com o pedido");
  const y = 1.7, h = 3.3;
  bloco(s, {
    x: M, y: y, w: 5.85, h: h, fill: C.redLt, line: "F2C8C4", mono: true,
    marca: "✕", cor: C.red, titulo: "Pedido vago",
    corpo: "otimiza essa função aqui pra mim",
  });
  s.addText(
    "Otimizar em quê? Tempo, memória, número de queries?\n\n" +
    "Ele escolhe — e devolve algo legítimo, com async, ORM trocado e assinatura nova.\n\n" +
    "Não dá pra usar.",
    { x: M + 0.28, y: y + 1.25, w: 5.3, h: 1.9, fontFace: FB, fontSize: 12.5, color: C.text, margin: 0, lineSpacing: 17 }
  );
  bloco(s, {
    x: M + 6.15, y: y, w: 5.85, h: h, fill: C.greenLt, line: "C6DECF", mono: true,
    marca: "✓", cor: C.green, titulo: "Pedido com aceite",
    corpo:
      "Suspeita: N+1 no lazy load.\n\n" +
      "RESTRIÇÕES\n" +
      "- manter assinatura e retorno\n" +
      "- sem dependência nova\n" +
      "- sem async\n\n" +
      "ACEITE\n" +
      "- nº de queries constante\n" +
      "- diga quantas antes e depois",
  });
  s.addText("O pedido errado devolve código. O certo devolve código que entra no PR.", {
    x: M, y: 5.25, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  selo(s);
  s.addNotes("Custo de escrever: 40 segundos. Custo de nao escrever: o review inteiro.");
}

// ============ 11. PLANO ANTES DO CODIGO ============
{
  const s = novo();
  titulo(s, "Em tarefa grande: plano antes do código");
  subtitulo(s, "O parágrafo que mais me poupou retrabalho", 1.42);

  card(s, { x: M, y: 2.1, w: 7.4, h: 2.3, fill: C.dark, line: C.dark });
  s.addText(
    "Antes de escrever qualquer código:\n" +
    "1. liste os arquivos que pretende tocar\n" +
    "2. aponte os riscos e o que pode quebrar\n" +
    "3. diga o que você NÃO vai mexer\n\n" +
    "Pare aí e espere meu OK.",
    { x: M + 0.35, y: 2.35, w: 6.7, h: 1.85, fontFace: FM, fontSize: 12.5, color: C.light, margin: 0, lineSpacing: 19 }
  );
  s.addText("Por que funciona", {
    x: M + 7.9, y: 2.15, w: 4.0, h: 0.4,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  s.addText(
    [
      { text: "Corrigir um plano de 10 linhas custa uma frase.", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
      { text: "Corrigir 400 linhas geradas custa a tarefa inteira.", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
      { text: "“Não mexe no serializers.py, é contrato público” — ele não tinha como saber.", options: { bullet: true } },
    ],
    { x: M + 7.9, y: 2.65, w: 4.1, h: 1.9, fontFace: FB, fontSize: 13, color: C.muted, margin: 0, lineSpacing: 17 }
  );
  rodape(s, "Uso isso sempre que a tarefa passa de um arquivo.");
  selo(s);
  s.addNotes("Demonstrar ao vivo se der tempo — e o item mais facil de copiar.");
}

// ============ 12. SECAO C ============
secao("C", "O que eu persisto", "Contexto morre com a sessão. O que precisa sobreviver vira arquivo");

// ============ 13. CLAUDE.MD ============
{
  const s = novo();
  titulo(s, "Um arquivo de contexto no repositório");
  subtitulo(s, "Lido em toda sessão, por todo mundo — então cada linha precisa se pagar", 1.42);

  const y = 2.05, h = 2.6;
  bloco(s, {
    x: M, y: y, w: 5.85, h: h, fill: C.redLt, line: "F2C8C4",
    marca: "✕", cor: C.red, titulo: "Não entra",
    corpo: "“Usamos Python e FastAPI.”\n“Os testes ficam em tests/.”\n“Escreva código de qualidade.”\n\nEle descobre isso em 2 segundos lendo o repo. Eu pago por essas linhas todo dia.",
    size: 13,
  });
  bloco(s, {
    x: M + 6.15, y: y, w: 5.85, h: h, fill: C.greenLt, line: "C6DECF",
    marca: "✓", cor: C.green, titulo: "Entra",
    corpo: "“app/legacy/ está congelado.”\n“Nunca chame billing direto — o rate limit é compartilhado e derruba geral.”\n“PA = Pedido Antecipado.”\n\nIsso ele nunca descobre sozinho.",
    size: 13,
  });
  s.addText("Teste: se a linha pode ser respondida lendo o README, eu apago.", {
    x: M, y: 4.95, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  selo(s);
  s.addNotes("Armadilhas e a secao de maior valor. Pergunta para levantar conteudo: o que ja quebrou alguem que entrou agora?");
}

// ============ 14. OBSIDIAN ============
{
  const s = novo();
  titulo(s, "Obsidian: onde guardo o que o código não conta");
  const y = 1.75, h = 3.05;
  bloco(s, {
    x: M, y: y, w: 5.85, h: h, fill: C.redLt, line: "F2C8C4",
    marca: "✕", cor: C.red, titulo: "Nota-diário (inútil)",
    corpo: "“Ontem discutimos o importador.\nO pessoal falou que era melhor a\nabordagem nova. O João vai olhar.”\n\nSeis meses depois: qual problema?\nqual abordagem? “ontem” quando?\nO João ainda está no time?",
    size: 12.5,
  });
  bloco(s, {
    x: M + 6.15, y: y, w: 5.85, h: h, fill: C.greenLt, line: "C6DECF",
    marca: "✓", cor: C.green, titulo: "Fato, com porquê e validade",
    corpo: "“Importação roda em lote noturno.\n\nPor quê: fornecedor limita 100 req/min.\nTempo real derrubava a integração.\n\nConsequência: estoque tem 24h de atraso.\n\nDecidido em 2026-05-20.”",
    size: 12.5,
  });
  s.addText("O título é a afirmação, não o tópico — é por ele que a IA decide se a nota importa.", {
    x: M, y: 5.05, w: W - 2 * M, h: 0.5,
    fontFace: FB, fontSize: 15.5, color: C.text, margin: 0, italic: true,
  });
  selo(s);
  s.addNotes("Regra que uso: data absoluta sempre. 'Recentemente' apodrece em silencio.");
}

// ============ 15. SUPERPOWERS ============
{
  const s = novo(true);
  titulo(s, "O que mais mudou meu resultado", { color: C.light });
  s.addText("Não foi trocar de modelo. Foi colocar método dentro da ferramenta.", {
    x: M, y: 1.5, w: 11.9, h: 0.5,
    fontFace: FB, fontSize: 16, color: "9AA4B2", margin: 0, italic: true,
  });

  const itens = [
    ["Superpowers", "Obriga o ciclo: entender → planejar → executar → verificar.\nO agente não avança de etapa sem cumprir a anterior."],
    ["Sem ele", "Eu seguia o ciclo quando dava tempo.\nSob prazo, era a primeira coisa que eu abandonava."],
  ];
  let y = 2.4;
  itens.forEach((it, i) => {
    card(s, { x: M, y: y, w: W - 2 * M, h: 1.25, fill: i === 0 ? C.teal : C.darkAlt, line: i === 0 ? C.teal : "3A414D" });
    s.addText(it[0], {
      x: M + 0.35, y: y + 0.2, w: 2.9, h: 0.4,
      fontFace: FB, fontSize: 16, bold: true, color: C.light, margin: 0,
    });
    s.addText(it[1], {
      x: M + 3.4, y: y + 0.2, w: 8.2, h: 0.9,
      fontFace: FB, fontSize: 13, color: i === 0 ? "D7EDEA" : "9AA4B2", margin: 0, lineSpacing: 18,
    });
    y += 1.5;
  });
  s.addText("A disciplina que depende de mim lembrar, sob prazo, não é disciplina.", {
    x: M, y: 5.5, w: 11.9, h: 0.5,
    fontFace: FT, fontSize: 19, bold: true, color: C.light, margin: 0,
  });
  selo(s, true);
  s.addNotes("Ponto honesto: o processo custa tokens a mais por sessao. O ganho aparece em nao refazer a tarefa.");
}

// ============ 16. SECAO D ============
secao("D", "Quando eu delego", "Vocês usam agente autônomo. Aqui está o critério que eu aplicaria");

// ============ 17. MATRIZ ============
{
  const s = novo();
  titulo(s, "Faço na mão · piloto · delego");
  subtitulo(s, "Decido isso antes de abrir a ferramenta, não depois", 1.42);

  const cols = [
    ["FAÇO NA MÃO", C.red, C.redLt, "Decisão de arquitetura\nTrade-off de produto\nCódigo de auth e pagamento\nIncidente em produção"],
    ["PILOTO", "B45309", "FDF1E3", "Causa desconhecida\nDesign ainda aberto\nRefactor que atravessa módulos\nExploração de alternativas"],
    ["DELEGO", C.green, C.greenLt, "Migração mecânica\nBug com repro determinístico\nTeste faltando\nLint e tipo em massa"],
  ];
  const bw = 3.85, gap = 0.35;
  let x = M;
  cols.forEach((c) => {
    card(s, { x: x, y: 2.05, w: bw, h: 2.75, fill: c[2], line: c[2] });
    s.addText(c[0], {
      x: x + 0.25, y: 2.25, w: bw - 0.5, h: 0.4,
      fontFace: FB, fontSize: 15, bold: true, color: c[1], margin: 0,
    });
    s.addText(c[3], {
      x: x + 0.25, y: 2.75, w: bw - 0.5, h: 1.9,
      fontFace: FB, fontSize: 13, color: C.text, margin: 0, lineSpacing: 21,
    });
    x += bw + gap;
  });
  s.addText("Delego o tedioso e verificável. Piloto o ambíguo. Faço na mão o irreversível.", {
    x: M, y: 5.05, w: W - 2 * M, h: 0.45,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  s.addText("A pergunta que resolve quase tudo: existe teste que prova que ficou certo? Se não existe, não delego.", {
    x: M, y: 5.5, w: 11.9, h: 0.45,
    fontFace: FB, fontSize: 14, color: C.muted, margin: 0, italic: true,
  });
  selo(s);
  s.addNotes("Se a squad usa Devin, este e o slide para abrir discussao — perguntar em qual coluna cai o que eles delegam hoje.");
}

// ============ 18. REVIEW ============
{
  const s = novo();
  titulo(s, "Um PR que passa no CI e não deve ser aprovado");
  card(s, { x: M, y: 1.7, w: 6.6, h: 2.95, fill: C.dark, line: C.dark });
  s.addText(
    "  def parse_row(row) -> int | None:\n" +
    "-     return int(row[\"quantidade\"])\n" +
    "+     try:\n" +
    "+         return int(row[\"quantidade\"])\n" +
    "+     except Exception:\n" +
    "+         return None\n\n" +
    "- def test_invalido():\n" +
    "-     with pytest.raises(ValueError):\n" +
    "+ def test_invalido():\n" +
    "+     assert parse_row(\"abc\") is None",
    { x: M + 0.3, y: 1.95, w: 6.0, h: 2.5, fontFace: FM, fontSize: 11, color: C.light, margin: 0, lineSpacing: 16 }
  );
  s.addText("CI verde. Três problemas:", {
    x: M + 7.1, y: 1.75, w: 4.9, h: 0.4,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  s.addText(
    [
      { text: "except Exception engole tudo — coluna faltando vira None silencioso", options: { bullet: true, breakLine: true, paraSpaceAfter: 12 } },
      { text: "o teste antigo foi invertido para passar", options: { bullet: true, breakLine: true, paraSpaceAfter: 12 } },
      { text: "e tem um parâmetro de biblioteca que simplesmente não existe", options: { bullet: true } },
    ],
    { x: M + 7.1, y: 2.3, w: 4.9, h: 2.3, fontFace: FB, fontSize: 13, color: C.muted, margin: 0, lineSpacing: 17 }
  );
  s.addText("Ler o diff não é revisar. O segundo item é o mais grave e o mais fácil de passar batido.", {
    x: M, y: 4.9, w: W - 2 * M, h: 0.45,
    fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
  });
  s.addText("Meu atalho: git diff nos testes primeiro. Linha alterada em teste existente exige justificativa escrita.", {
    x: M, y: 5.35, w: 11.9, h: 0.45,
    fontFace: FB, fontSize: 14, color: C.muted, margin: 0, italic: true,
  });
  selo(s);
  s.addNotes("Deixar a plateia achar os problemas antes de revelar. Funciona melhor como pergunta.");
}

// ============ 19. O QUE EU NAO FACO ============
{
  const s = novo();
  titulo(s, "O que eu não faço com IA");
  subtitulo(s, "Saber onde não usar é metade do ganho", 1.42);

  const itens = [
    ["Conta e agregação", "Ele estima a partir do texto. Peço a query — a máquina calcula, o número é auditável."],
    ["Decisão de arquitetura", "Uso para levantar alternativas. A escolha é minha, e é onde está o meu valor."],
    ["Aprovar o que não entendo", "Se não entendo cada linha, não aprovo. Dívida no dia 1, incidente no dia 90."],
    ["Dado de cliente e segredo", "Nunca cola no prompt. Anonimizo ou uso dado sintético. Sem exceção de prazo."],
  ];
  let y = 2.05;
  itens.forEach((it) => {
    s.addShape(pres.ShapeType.ellipse, { x: M, y: y, w: 0.4, h: 0.4, fill: { color: C.redLt } });
    s.addText("✕", {
      x: M, y: y, w: 0.4, h: 0.4, fontFace: FB, fontSize: 12, bold: true,
      color: C.red, align: "center", valign: "middle", margin: 0,
    });
    s.addText(it[0], {
      x: M + 0.62, y: y - 0.03, w: 3.5, h: 0.4,
      fontFace: FB, fontSize: 15, bold: true, color: C.text, margin: 0,
    });
    s.addText(it[1], {
      x: M + 4.2, y: y - 0.03, w: 7.4, h: 0.7,
      fontFace: FB, fontSize: 13, color: C.muted, margin: 0, lineSpacing: 17,
    });
    y += 0.92;
  });
  rodape(s, "A responsabilidade não é delegável: quem aprova responde. “A IA escreveu” não explica incidente.");
  selo(s);
  s.addNotes("O item de dado de cliente merece pausa. Se a squad lida com dado regulado, abrir conversa aqui.");
}

// ============ 20. FERRAMENTAS ============
{
  const s = novo();
  titulo(s, "Minha stack, rápido");
  subtitulo(s, "Menos importante do que tudo que veio antes — mas sempre perguntam", 1.42);

  const linhas = [
    ["Claude Code", "onde eu trabalho", C.teal],
    ["Superpowers", "impõe o ciclo; a que mais mudou meu resultado", C.teal],
    ["Obsidian", "o que o código não conta: decisão, porquê, regra de negócio", C.teal],
    ["Compressão de saída", "resposta densa; economiza agora e no histórico depois", C.muted],
  ];
  let y = 2.1;
  linhas.forEach((l) => {
    card(s, { x: M, y: y, w: W - 2 * M, h: 0.82, fill: C.soft, line: "E2E5EA" });
    s.addText(l[0], {
      x: M + 0.3, y: y + 0.21, w: 3.3, h: 0.4,
      fontFace: FB, fontSize: 15, bold: true, color: l[2], margin: 0,
    });
    s.addText(l[1], {
      x: M + 3.8, y: y + 0.21, w: 7.9, h: 0.4,
      fontFace: FB, fontSize: 13.5, color: C.text, margin: 0,
    });
    y += 0.97;
  });
  s.addText("Trocar de ferramenta não resolve problema de método. Pedido ruim é ruim em qualquer uma.", {
    x: M, y: 5.95, w: W - 2 * M, h: 0.45,
    fontFace: FB, fontSize: 15.5, bold: true, color: C.text, margin: 0,
  });
  selo(s);
  s.addNotes("Passar rapido. Se alguem perguntar de Devin: eu nao uso no dia a dia, mas o criterio do slide da matriz vale igual.");
}

// ============ 21. SEGUNDA-FEIRA ============
{
  const s = novo();
  titulo(s, "Se vocês pegarem três coisas daqui");
  subtitulo(s, "Nessa ordem — a primeira sozinha já muda o resultado", 1.42);

  const itens = [
    ["1", "Mande o trecho, não o arquivo", "Recorte o traceback e diga o que já verificou."],
    ["2", "Diga como você vai saber que ficou certo", "Uma linha de critério de aceite, junto com o pedido."],
    ["3", "Rode antes de aprovar", "Ler o diff não é revisar. Vale para PR de IA e de gente."],
  ];
  let y = 2.15;
  itens.forEach((it) => {
    card(s, { x: M, y: y, w: W - 2 * M, h: 1.15, fill: C.soft, line: "E2E5EA" });
    s.addShape(pres.ShapeType.ellipse, { x: M + 0.32, y: y + 0.3, w: 0.55, h: 0.55, fill: { color: C.teal } });
    s.addText(it[0], {
      x: M + 0.32, y: y + 0.3, w: 0.55, h: 0.55,
      fontFace: FB, fontSize: 15, bold: true, color: C.light,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(it[1], {
      x: M + 1.15, y: y + 0.22, w: 10.4, h: 0.4,
      fontFace: FB, fontSize: 16, bold: true, color: C.text, margin: 0,
    });
    s.addText(it[2], {
      x: M + 1.15, y: y + 0.63, w: 10.4, h: 0.35,
      fontFace: FB, fontSize: 13, color: C.muted, margin: 0,
    });
    y += 1.3;
  });
  rodape(s, "Nenhuma das três depende de instalar nada.");
  selo(s);
  s.addNotes("Fechar com pedido concreto: escolher UMA e tentar essa semana.");
}

// ============ 22. Q&A ============
{
  const s = novo(true);
  s.addText("Agora é de vocês", {
    x: M, y: 2.3, w: 11, h: 0.9,
    fontFace: FT, fontSize: 42, bold: true, color: C.light, margin: 0,
  });
  s.addText("30 minutos. Discordar é o melhor uso desse tempo.", {
    x: M, y: 3.25, w: 11, h: 0.5,
    fontFace: FB, fontSize: 17, color: C.teal, margin: 0,
  });
  s.addText(
    [
      { text: "Onde isso não vai funcionar no nosso contexto?", options: { bullet: true, breakLine: true, paraSpaceAfter: 8 } },
      { text: "O que vocês já fazem que eu deveria copiar?", options: { bullet: true, breakLine: true, paraSpaceAfter: 8 } },
      { text: "Qual tarefa da sprint serviria de teste?", options: { bullet: true } },
    ],
    { x: M, y: 4.25, w: 8.5, h: 1.6, fontFace: FB, fontSize: 15, color: "9AA4B2", margin: 0, lineSpacing: 22 }
  );
  s.addText("Material completo e templates: <link do repositório>", {
    x: M, y: H - 1.0, w: 10, h: 0.4,
    fontFace: FB, fontSize: 13, color: C.muted, margin: 0, italic: true,
  });
  s.addNotes("Se travar a conversa, comecar pela terceira pergunta — e a mais concreta e sempre destrava.");
}

pres.writeFile({ fileName: process.argv[2] }).then(f => console.log("ok: " + f));
