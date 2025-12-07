export async function getTodasDisciplinasEscola(idEscola) {
  try {
    const resposta = await fetch(`http://127.0.0.1:8000/disciplina/escola/${idEscola}`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'Content-Type' : "application/json"}
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

export async function getDisciplinasProfessor(idProfessor) {
  try {
    const resposta = await fetch(`http://localhost:8000/disciplina/prodessor/${idProfessor}`, {
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

export async function getDisciplinasTurma(idTurma) {
  try {
    const resposta = await fetch(`http://localhost:8000/disciplina/turma/${idTurma}`, {
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

export async function getDisciplina(idDisciplina) {
  try {
    const resposta = await fetch(`http://localhost:8000/disciplina`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(idDisciplina)
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

export async function cadastrarDisciplina(formData, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/disciplina/cadastro`, {
      method: 'POST',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
    });

    const dados = await resposta.json();
    console.log(dados);
    return dados;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function atualizarDisciplina(idDisciplina, formData) {
    try {
    const resposta = await fetch(`http://localhost:8000/disciplina/atualizar/${idDisciplina}`, {
      method: 'PUT',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
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