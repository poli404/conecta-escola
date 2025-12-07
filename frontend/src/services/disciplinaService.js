export async function getTodasDisciplinasEscola(idEscola) {
  try {
    const resposta = await fetch(`https://localhost:8000/disciplina/escola/${idEscola}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status == 200) {
      return resposta.json();
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
    const resposta = await fetch(`https://localhost:8000/disciplina/prodessor/${idProfessor}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status == 200) {
      return resposta.json();
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
    const resposta = await fetch(`https://localhost:8000/disciplina/turma/${idTurma}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status == 200) {
      return resposta.json();
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
    const resposta = await fetch(`https://localhost:8000/disciplina`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(idDisciplina)
    });

    if (resposta.status == 200) {
      return resposta.json();
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function cadastrarDisciplina(formData) {
    try {
    const resposta = await fetch(`https://localhost:8000/disciplina/cadastro`, {
      method: 'POST',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
    });

    if (resposta.status == 201) {
      return resposta.json();
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function atualizarDisciplina(idDisciplina, formData) {
    try {
    const resposta = await fetch(`https://localhost:8000/disciplina/atualizar/${idDisciplina}`, {
      method: 'PUT',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
    });

    if (resposta.status == 203) {
      return resposta.json();
    } else {
      return null;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}