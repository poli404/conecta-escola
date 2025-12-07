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

export async function deletarFalta(idFalta, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/falta/${idFalta}`, {
      method: 'DELETE',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
    });

    const dados = await resposta.json();
    console.log(dados);
    return dados;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }
}