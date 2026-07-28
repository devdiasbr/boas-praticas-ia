# -*- coding: utf-8 -*-
"""
Transformacao bronze -> silver do pipeline de pedidos.

ESTE ARQUIVO E O QUE VOCE (ou o agente) VAI IMPLEMENTAR.

Nao mude as assinaturas: os testes dependem delas.
"""
from typing import Dict, List

Linha = Dict[str, str]


def deduplicar(linhas: List[Linha]) -> List[Linha]:
    """
    Remove duplicatas geradas por reprocessamento de lote.

    Recebe as linhas de bronze.pedidos e devolve as linhas que devem seguir
    para silver.

    TODO: implementar.
    """
    raise NotImplementedError("implementar deduplicar()")


def faturamento_centavos(linhas: List[Linha]) -> int:
    """
    Soma o faturamento, em centavos, das linhas ja deduplicadas.

    TODO: implementar.
    """
    raise NotImplementedError("implementar faturamento_centavos()")
