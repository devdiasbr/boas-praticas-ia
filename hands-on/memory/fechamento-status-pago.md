# Faturamento do fechamento conta apenas linhas com status pago

O número que o financeiro usa no fechamento soma `valor_centavos` apenas das linhas
cujo `status = 'pago'`.

**Por quê:** pedido criado ainda não é receita; pedido cancelado nunca foi. A régua é
do financeiro e consta na política de reconhecimento de receita.

**Consequência prática:** pedido cancelado **não** entra, mesmo tendo valor
preenchido. Pedido que passou por vários status entra **uma vez**, pela linha de
`pago`.

**Decidido em:** 2025-08-12 · política de reconhecimento de receita
**Revisar se:** a política mudar

Relacionado: [[pedidos-append-only]]
