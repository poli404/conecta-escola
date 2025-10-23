async function cadastrarEscola(dadosEscola) {
  const response = await fetch('http://localhost:8000/escola/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dadosEscola
  });
  console.log('Response status:', response.json());
  return response.json();
}