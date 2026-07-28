# -*- coding: utf-8 -*-
"""
Testes do exercicio. Rodam com pytest, sem infra:

    pytest hands-on/tests -q

Os dois primeiros passam com QUALQUER deduplicacao.
Os dois ultimos separam a solucao certa da errada — e sao os que a squad
so escreve se tiver a regra de negocio em maos.
"""
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from dedup import deduplicar, faturamento_centavos  # noqa: E402

DADOS = Path(__file__).resolve().parents[1] / "dados" / "bronze_pedidos.csv"


def carregar():
    with open(DADOS, encoding="utf-8") as f:
        return list(csv.DictReader(f))


# --- passam com qualquer dedup: nao servem para decidir -------------------

def test_remove_reprocessamento_do_lote():
    """A linha duplicada pelo reprocessamento de 2026-06-14 some."""
    linhas = deduplicar(carregar())
    chaves = [(r["pedido_id"], r["status"], r["atualizado_em"]) for r in linhas]
    assert len(chaves) == len(set(chaves)), "sobrou duplicata exata"


def test_nao_perde_pedido():
    """Nenhum pedido desaparece inteiro."""
    antes = {r["pedido_id"] for r in carregar()}
    depois = {r["pedido_id"] for r in deduplicar(carregar())}
    assert antes == depois


# --- estes decidem: so passam se a chave de negocio estiver certa ---------

def test_preserva_historico_de_status():
    """
    PED-0003 tem quatro transicoes distintas (criado, pago, enviado, entregue).
    As quatro precisam sobreviver: sao trilha de auditoria, nao duplicata.
    """
    linhas = [r for r in deduplicar(carregar()) if r["pedido_id"] == "PED-0003"]
    status = sorted(r["status"] for r in linhas)
    assert status == ["criado", "entregue", "enviado", "pago"], (
        "historico de status foi apagado: sobraram %r" % status
    )


def test_faturamento_bate_com_fechamento():
    """
    Fechamento contabil de junho: R$ 770,00.
    Soma apenas linhas 'pago', cada pedido contando uma vez.
    """
    assert faturamento_centavos(deduplicar(carregar())) == 77000


def test_cancelado_nao_entra_no_faturamento():
    """PED-0005 foi cancelado: R$ 300,00 que nao sao receita."""
    linhas = deduplicar(carregar())
    assert not any(
        r["pedido_id"] == "PED-0005" and r["status"] == "pago" for r in linhas
    )
    assert faturamento_centavos(linhas) < 107000
