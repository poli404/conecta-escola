import enum

class CorRaca(enum.Enum):
    BRANCA = "BRANCA"
    PRETA = "PRETA"
    PARDA = "PARDA"
    AMARELA = "AMARELA"
    INDIGENA = "INDIGENA"

class EstadoCivil(enum.Enum):
    SOLTEIRO = "SOLTEIRO"
    CASADO = "CASADO"
    DIVORCIADO = "DIVORCIADO"
    VIUVO = "VIUVO"

class Genero(enum.Enum):
    FEMININO = "FEMININO"
    MASCULINO = "MASCULINO"
    OUTRO = "OUTRO"

class TipoPessoa(enum.Enum):
    PESSOA = "PESSOA"
    ALUNO = "ALUNO"
    PROFESSOR = "PROFESSOR"
    RESPONSAVEL = "RESPONSAVEL"

class Uf(enum.Enum):
    AC = "AC"
    AL = "AL"
    AP = "AP"
    AM = "AM"
    BA = "BA"
    CE = "CE"
    DF = "DF"
    ES = "ES"
    GO = "GO"
    MA = "MA"
    MT = "MT"
    MS = "MS"
    MG = "MG"
    PA = "PA"
    PB = "PB"
    PR = "PR"
    PE = "PE"
    PI = "PI"
    RJ = "RJ"
    RN = "RN"
    RS = "RS"
    RO = "RO"
    RR = "RR"
    SC = "SC"
    SP = "SP"
    SE = "SE"
    TO = "TO"