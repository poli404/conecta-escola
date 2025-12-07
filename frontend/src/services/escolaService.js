export async function cadastrarEscola(dadosEscola) {
  const response = await fetch('http://127.0.0.1:8000/escola/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosEscola)
  });
  const dados = await response.json();
  console.log(dados);
  return dados;
}

export async function getEscola(dominio) {
  try {
    const resposta = await fetch(`https://localhost:8000/escola/${dominio}`, {
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