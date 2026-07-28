---
name: revisar-pr-de-agente
description: Use ao revisar um PR gerado por IA ou agente autônomo, antes de aprovar. Aplica o checklist de código gerado — escopo, API inventada, teste enfraquecido, segredo.
---

# Revisar PR de agente

<!-- EXEMPLO de skill. Repare: a descrição acima é o que fica sempre visível e
     decide se a skill é acionada; o corpo só carrega quando ela dispara.
     Skill é para o que REPETE. Tarefa que acontece uma vez é prompt, não skill. -->

Revise como PR de um contribuidor externo competente, apressado e excessivamente
confiante. **Não** como sugestão de autocomplete.

## Ordem de execução

**1. Rode.** Localmente ou em CI real. Ler o diff não é revisar.

**2. Cheque o diff dos testes primeiro.**

```bash
git diff origin/main -- '*test*'
```

Toda linha **removida ou alterada** em teste existente exige justificativa escrita
na descrição do PR. Sem justificativa, rejeita. Este é o problema mais grave e o
mais fácil de passar batido — a linha continua verde.

**3. Cheque o escopo.**

```bash
git diff --stat origin/main
```

Arquivo fora do escopo autorizado é motivo de rejeição, não de "já que está aí".

**4. Percorra o checklist:**

- [ ] **Dependências e APIs existem?** Toda importação, função e parâmetro existe
      **naquela versão**? Alucinação de API é a falha mais comum: o nome é plausível,
      a função é real, o parâmetro é inventado.
- [ ] **Os testes provam algo?** O teste falha se você quebrar o código de propósito?
      Cuidado com asserção enfraquecida, mock que engole o caso real, `skip`, `xfail`.
- [ ] **Tratamento de erro.** Existe caminho de exceção, ou tudo é caminho feliz?
      `except` genérico que engole tudo é rejeição.
- [ ] **Segredo.** Nenhuma credencial, token, endpoint interno ou dado real —
      inclusive em fixture.
- [ ] **Requisito, não sintoma.** Resolve o que a spec pediu, ou faz o sintoma sumir?
- [ ] **Você entende cada linha.** Se não entende, não aprova. Código que ninguém
      entende é dívida no dia 1 e incidente no dia 90.

## Sinais de alerta

PR muito maior que o esperado · refactor não pedido junto da correção · abstração
nova para um único caso de uso · comentário explicando o óbvio · mudança de
configuração não mencionada na descrição.

## Saída

Aprovar, ou rejeitar apontando **qual item do checklist falhou**. Se o problema for
escopo ou abordagem, o defeito está na tarefa, não no PR: reescreva a tarefa antes
de mandar de volta.
