export async function cadastrarEscola(dadosEscola) {
  const response = await fetch('http://localhost:8000/escola/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosEscola)
  });
  console.log('Response status:', response.json());
  return response.json();
}

export async function getEscola(dominio) {
  try {
    const resposta = await fetch(`https://localhost:8000/escola/${dominio}`, {
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