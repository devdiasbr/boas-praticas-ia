# Índice de memória

> **Só o índice mora aqui.** Uma linha por fato, apontando para o arquivo.
> O conteúdo fica nos arquivos e é carregado sob demanda.
> Se este índice passar de ~40 linhas, é hora de podar (ver Manutenção abaixo).

## Como escrever um fato

- **Um fato por arquivo.** Atualiza um sem tocar nos outros; o `git log` fica legível.
- **O título é a afirmação, não o tópico.** "Janela de cancelamento são 30 minutos",
  não "Cancelamento". É pelo título que a IA decide se a nota é relevante.
- **Registre o porquê.** Decisão sem motivo não pode ser revogada com segurança.
- **Data absoluta.** "Recentemente" e "semana passada" apodrecem em silêncio.
- **Não é diário.** "Hoje discutimos X" é log. Guarde o que ficou verdadeiro.
- **Não duplique o código.** Estrutura, assinatura e histórico se leem do repositório,
  sempre atualizados e de graça.

## Fatos

<!-- formato: - [Título que é a afirmação](arquivo.md) — gancho de uma linha -->

- [Fornecedor 3P é instável por contrato](fornecedor-3p.md) — SLA de 97%, assumir falha
- <adicione os seus>

## Manutenção

- **Poda trimestral.** Nota nunca recuperada é custo puro: título ruim ou fato
  irrelevante. Apague sem cerimônia.
- **Nota contraditória é o pior estado possível** — a IA escolhe uma das duas, com
  confiança, e ninguém vê qual. Ao mudar um fato, corrija a nota; não crie outra.
- **Nada entra sem revisão humana**, especialmente vindo de fonte externa (ticket,
  e-mail, página web, retorno de ferramenta). Memória é prompt injection persistente:
  vale para toda sessão futura, de todo mundo.
- **Não guarde estado mutável** aqui — versão de dependência, dono do serviço,
  caminho de arquivo, URL de ambiente. Isso se consulta.
- **Nunca** segredo, credencial ou dado pessoal. Este diretório é lido inteiro por
  ferramenta, todo dia.
