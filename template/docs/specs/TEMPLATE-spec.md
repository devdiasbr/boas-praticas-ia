# <Título: o comportamento esperado, não a tarefa>

<!--
USE ESTE ARQUIVO SOMENTE se você não usa um framework de processo que já escreve a
spec (Superpowers e similares escrevem). Se usa, não crie uma spec paralela — valide
a que o framework gerou com o CHECKLIST-spec.md ao lado.

Nome do arquivo: AAAA-MM-DD-assunto.md

A spec é a fonte de verdade. O código é saída dela.
Cinco linhas explícitas valem mais que meia hora de prompt vago.
Se ninguém lê, não serve — isto é contrato mínimo, não documento cerimonial.
-->

## Problema

<O que está errado hoje, com evidência. Número, frequência, impacto.
Não escreva a solução aqui.>

## Comportamento esperado

<Uma ou duas frases. O que passa a ser verdade quando isto estiver pronto.>

## Regras

<As decisões que o modelo não tem como adivinhar. Seja específico:
o que trata, o que NÃO trata, limites, valores, casos de borda.>

-
-

## Fora de escopo

<A parte que mais economiza. O que não pode ser tocado, e por quê quando não é óbvio.>

- <Ex.: outros clientes HTTP do projeto>
- <Ex.: circuit breaker — issue #NNN, decisão adiada de propósito>
- <Ex.: qualquer mudança no contrato do endpoint>

## Aceite

<Verificável por comando, não por opinião. "Deve ficar rápido" não é critério;
"p95 abaixo de 200ms medido por `<comando>`" é.>

- [ ] `<comando de teste>` passa
- [ ] Teste: <caso específico> → <resultado esperado>
- [ ] Teste: <caso de borda> → <resultado esperado>
- [ ] `<comando de lint/tipo>` limpo
- [ ] Nenhuma dependência nova

## Decisões descartadas

<Opcional, mas evita retrabalho: o que foi considerado e recusado, com o motivo.
Sem isto, a próxima sessão propõe de novo o que já foi rejeitado.>

-

---
*Autor: <nome> · Data: <AAAA-MM-DD> · Issue: <link>*
