export async function cadastrarFalta(formData, autorizacao) {
    try {
    const resposta = await fetch(`http://localhost:8000/falta/cadastro`, {
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