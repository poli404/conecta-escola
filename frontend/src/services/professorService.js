export async function getTodosProfessoresEscola(idEscola) {
  try {
    const resposta = await fetch(`https://localhost:8000/professor/escola/${idEscola}`, {
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

export async function cadastrarProfessor(dados) {
  try {
    const resposta = await fetch(`https://localhost:8000/professor/cadastro`, {
      method: 'POST',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
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