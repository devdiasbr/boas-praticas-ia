# <Objetivo em uma linha>

<!--
Tarefa para agente autônomo (Devin e similares). NÃO é prompt de chat.
Você está abrindo chamado para alguém que não pode te perguntar nada.

ANTES DE ESCREVER, passe pela triagem. Cinco "sim" ou não delegue:
  [ ] O escopo está fechado e escrito?
  [ ] Existe teste ou verificação automática que prova o resultado?
  [ ] A tarefa é livre de decisão de arquitetura ou de produto?
  [ ] O código é não sensível (fora de auth, pagamento, dado pessoal, infra)?
  [ ] Você saberia revisar o PR resultante com competência?
Qualquer "não" → pilote no modo assistido, ou faça na mão.
-->

## Objetivo

<Uma frase. O resultado esperado, não os passos.>

## Contexto

<Por que isso existe. Link para issue/spec. O que já foi tentado e falhou.>

## Escopo

```
IN:  <arquivos, módulos e comportamentos que PODEM mudar>

OUT: <o que NÃO pode ser tocado, em hipótese nenhuma>
     <ex.: qualquer arquivo em app/ — código de produção não muda>
     <ex.: o manifesto de dependências — sem dependência nova>
     <ex.: qualquer assert existente — nenhum teste enfraquecido, pulado ou removido>
```

## Ponto de partida

- `<arquivo:linha>` — <o que tem ali>
- Repro: `<comando exato>`
- Rodar projeto: `<comando>` · Rodar testes: `<comando>`
- <Direção sugerida, marcada como NÃO obrigatória — senão vira ordem>

## Critério de aceite

<Verificável por comando. Nada de "ficar melhor".>

- [ ] `<comando>` <resultado esperado>
- [ ] `git diff --stat` mostra ZERO arquivo fora do escopo IN
- [ ] Nenhum assert existente alterado — confira o diff antes de abrir o PR
- [ ] Nenhuma dependência nova
- [ ] `<lint/tipo>` limpo

## Definição de pronto

PR aberto, descrição explicando a abordagem e as decisões tomadas, CI verde.

## Se travar

Não improvise, não amplie o escopo, não troque de abordagem em silêncio.
Pare, abra PR em rascunho com o que conseguiu, e escreva o que bloqueou.

<!--
DEPOIS DO PR — sinais de que a tarefa (não o agente) estava errada:
mexeu em arquivo fora do IN · adicionou dependência · reescreveu teste em vez
de corrigir código · terceiro ciclo de "tentando outra abordagem".
Nesse caso: aborte e reescreva a tarefa. Insistir é jogar orçamento fora.
-->
