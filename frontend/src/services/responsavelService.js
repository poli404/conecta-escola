export async function getResponsaveisEscola(idEscola) {
  try {
    const resposta = await fetch(`http://localhost:8000/responsavel/escola/${idEscola}`, {
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

export async function getResponsaveisAluno(idAluno) {
  try {
    const resposta = await fetch(`http://localhost:8000/responsavel/aluno/${idAluno}`, {
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

export async function getResponsavel(idResponsavel) {
  try {
    const resposta = await fetch(`http://localhost:8000/responsavel/${idResponsavel}`, {
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

export async function cadastrarResponsavel(dados) {
  try {
    const resposta = await fetch(`http://localhost:8000/responsavel/cadastro`, {
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

export async function atualizarResponsavel(idResponsavel, dados) {
  try {
    const resposta = await fetch(`http://localhost:8000/responsavel/atualizar/${idResponsavel}`, {
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
