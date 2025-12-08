export async function cadastrarNota(formData, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/nota`, {
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

export async function alterarNota(idNota, formData, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/nota/${idNota}`, {
      method: 'PUT',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
    });

    const dados = await resposta.json();
    if (dados.status === 200) {
      alert('Nota alterada com sucesso!');
      return dados;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function getNota(idNota, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/nota/${idNota}`, {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
    });

    const dados = await resposta.json();
    if (dados.status === 200) {
      console.log('Nota recuperada com sucesso!');
      return dados;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}