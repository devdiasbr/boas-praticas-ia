# Pedido tem uma linha por mudança de status, não uma por pedido

`bronze.pedidos` é append-only: cada mudança de status grava uma linha nova com o
mesmo `pedido_id`. Isso é intencional.

**Por quê:** o histórico de transições atende requisito de auditoria, com retenção de
5 anos. Foi acordado com o time de compliance, não é decisão de engenharia.

**Consequência prática:** deduplicar por `pedido_id` apaga histórico legítimo. A
duplicata de verdade — a que vem de reprocessamento de lote — é a repetição da mesma
tupla `(pedido_id, status, atualizado_em)`.

**Nunca:** `DELETE` em `bronze`. A camada é imutável por contrato. Correção de
duplicata vive na transformação para `silver`.

**Decidido em:** 2025-08-12 · auditoria interna
**Revisar se:** a política de retenção mudar

Relacionado: [[fechamento-status-pago]]
