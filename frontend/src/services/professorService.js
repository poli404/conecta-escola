export async function getTodosProfessoresEscola(idEscola) {
  try {
    const resposta = await fetch(`http://127.0.0.1:8000/professor/escola/${idEscola}`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'Content-Type' : "application/json"
      }
    });

    if (resposta.status === 200) {
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

export async function getProfessor(idProfessor) {
  try {
    const resposta = await fetch(`http://localhost:8000/professor/${idProfessor}`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'Content-Type' : "application/json"}
    });


    const dados = await resposta.json();
    console.log(dados);
    return dados;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function cadastrarProfessor(dados, autorizacao) {
  try {
    const resposta = await fetch(`http://localhost:8000/professor/cadastro`, {
      method: 'POST',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
    });

    
    const r = await resposta.json();
    return r;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function atualizarProfessor(idProfessor, dados) {
  try {
    const resposta = await fetch(`http://localhost:8000/professor/atualizar/${idProfessor}`, {
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