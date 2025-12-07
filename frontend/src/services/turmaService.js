export async function getTodasTurmasEscola(idEscola) {
  try {
    const resposta = await fetch(`https://localhost:8000/turma/escola/${idEscola}`, {
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

export async function getTurmasDisciplina(idDisciplina) {
    const resposta = await fetch(`https://localhost:8000/turma/disciplina/${idDisciplina}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
        alert("Turma não encontrada!");
    }
}

export async function getTurma(idTurma) {
    const resposta = await fetch(`https://localhost:8000/turma/${idTurma}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
        alert("Turma não encontrada!");
    }
}

export async function getTurmasProfessor(idProfessor) {
    const resposta = await fetch(`https://localhost:8000/turma/professor/${idProfessor}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
        alert("Turma não encontrada!");
    }
}

export async function cadastrarTurma(dados) {
  try {
    const resposta = await fetch(`https://localhost:8000/turma/cadastro`, {
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