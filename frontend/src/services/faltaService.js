export async function cadastrarFalta(formData, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/falta`, {
      method: 'POST',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(formData)
    });

    const dados = await resposta.json();

    if (dados.status === 201) {
      console.log(dados);
      return dados;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}

export async function deletarFalta(idFalta, autorizacao) {
    try {
    const resposta = await fetch(`http://127.0.0.1:8000/falta/${idFalta}`, {
      method: 'DELETE',
      headers: {
        'accept' : '*/*',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
    });

    if (resposta.status === 204) {
      return resposta;
    }
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}