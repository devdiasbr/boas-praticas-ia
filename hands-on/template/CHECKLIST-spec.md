# Checklist — validar a spec antes de executar

Se você usa um framework de processo (Superpowers e similares), **a spec já é escrita
por ele** no fim do brainstorming. Não reescreva num template paralelo — valide o que
saiu.

Este checklist existe porque o que costuma faltar não é seção: é precisão em duas ou
três delas.

---

## Obrigatório

- [ ] **Fora de escopo está preenchido.** É a seção que mais economiza e a primeira a
      sair vazia. Se está vazia, o brainstorming não chegou até o fim.

- [ ] **Critério de aceite é verificável por comando.** "Deve ficar correto" não serve.
      `pytest tests/x.py -q` verde, `p95 < 200ms medido por <comando>`, sim.

- [ ] **A regra de negócio aparece explícita**, não implícita no código proposto. Se a
      spec diz *"deduplicar pedidos"* sem dizer *o que conta como duplicata neste
      domínio*, ela ainda não decidiu nada.

- [ ] **O que NÃO pode ser tocado está nomeado.** Arquivo, camada, contrato público,
      valor contratual, dependência.

- [ ] **Uma pessoa que não participou da conversa consegue executar.** Se depende de
      contexto que só está na sua cabeça, ainda não é spec.

## Recomendado

- [ ] **Decisões descartadas, com o motivo.** Sem isso, a próxima sessão propõe de novo
      o que já foi recusado.
- [ ] **Link para a issue/chamado de origem.**
- [ ] **Data absoluta**, nunca relativa.

## Sinais de que a spec ainda não está pronta

| Sintoma | O que fazer |
|---|---|
| `Fora de escopo` vazio | Voltar ao brainstorming: o que **não** muda? |
| Critério que se avalia por opinião | Trocar por comando ou número |
| Spec que descreve a solução, não o comportamento | Perguntar "o que passa a ser verdade quando isso estiver pronto?" |
| Mais de uma tarefa na mesma spec | Quebrar |
| Você não sabe dizer como provar que ficou certo | Não é spec ainda — é intenção |

---

**Onde a spec vive:** deixe onde o seu framework a escreveu, versionada. Não duplique
em outro diretório — duas cópias divergem em uma semana.

**Se você não usa framework que gera spec**, use o [`TEMPLATE-spec.md`](TEMPLATE-spec.md)
ao lado e valide com este mesmo checklist.
