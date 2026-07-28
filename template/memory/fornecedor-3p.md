# Fornecedor 3P é instável por contrato

<!-- EXEMPLO. Apague quando tiver os seus. Repare no formato:
     título que afirma, porquê, consequência prática, data, validade. -->

O SLA contratado com o fornecedor de estoque é de **97%** de disponibilidade —
não 99,9%. Instabilidade não é incidente: é o comportamento previsto em contrato.

**Por quê importa:** toda integração com eles precisa nascer com retry e degradação
graciosa. Abrir incidente por 503 do 3P é ruído e consome plantão à toa.

**Consequência prática:** nenhuma funcionalidade pode assumir resposta síncrona
garantida do 3P. Se o fluxo não tolera falha, ele não pode depender dessa integração.

**Decidido em:** 2026-03-14, renegociação de contrato (jurídico + arquitetura).
**Revisar em:** 2027-03, na próxima renovação.

Relacionado: [[retry-estoque]], [[circuit-breaker-adiado]]
