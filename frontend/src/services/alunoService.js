export async function getTodosAlunosEscola(idEscola) {
  try {
    const resposta = await fetch(`http://localhost:8000/aluno/escola/${idEscola}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status == 200) {
      const dados = await resposta.json();
      return dados;
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function getTodosAlunosEscolaAnoEscolar(idEscola, anoEscolar) {
  try {
    const resposta = await fetch(`http://localhost:8000/aluno/escola/${idEscola}/ano/${anoEscolar}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status == 200) {
      const dados = await resposta.json();
      return dados;
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function getAlunosResponsavel(idResponsavel) {
    try {
      const resposta = await fetch(`http://localhost:8000/aluno/responsavel/${idResponsavel}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
      });

      if (resposta.status === 200) {
        const dados = await resposta.json();
        return dados;
      } else {
          alert("Alunos não encontrados!");
      }
    } catch (erro) {
      console.error("Erro:", erro);
      return null;
  }
}

export async function getAlunosTurma(idTurma) {
    try {
      const resposta = await fetch(`http://localhost:8000/aluno/turma/${idTurma}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
      });

      if (resposta.status === 200) {
        const dados = await resposta.json();
        return dados;
      } else {
          alert("Alunos não encontrados!");
      }
    } catch (erro) {
      console.error("Erro:", erro);
      return null;
  }
}

export async function getAluno(idAluno) {
    const resposta = await fetch(`http://localhost:8000/aluno/${idAluno}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
      alert("Aluno não encontrado!");
    }
}

export async function cadastrarAluno(dados) {
  try {
    const resposta = await fetch(`http://localhost:8000/aluno/cadastro`, {
      method: 'POST',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
    });

    if (resposta.status == 201) {
      const dados = await resposta.json();
      return dados;
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }

}

export async function atualizarAluno(idAluno, dados) {
  try {
    const resposta = await fetch(`http://localhost:8000/aluno/atualizar/${idAluno}`, {
      method: 'PUT',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
    });

    if (resposta.status == 203) {
      const dados = await resposta.json();
      return dados;
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }

}

export async function getNotas(idAluno) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/nota/aluno/${idAluno}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function getFaltas(idAluno) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/falta/aluno/${idAluno}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
  }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}