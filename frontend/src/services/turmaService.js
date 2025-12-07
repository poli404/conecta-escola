export async function getTodasTurmasEscola(idEscola) {
  try {
    const resposta = await fetch(`http://localhost:8000/turma/escola/${idEscola}`, {
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

export async function getTurmasDisciplina(idDisciplina) {
    const resposta = await fetch(`http://127.0.0.1:8000/turma/disciplina/${idDisciplina}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
        alert("Turma não encontrada!");
    }
}

export async function getTurma(idTurma) {
  const resposta = await fetch(`http://localhost:8000/turma/${idTurma}`, {
      method: 'GET',
      headers: {'Content-Type' : "application/json"}
  });

  const dados = await resposta.json();
  return dados;
}

export async function getTurmasProfessor(idProfessor) {
    const resposta = await fetch(`http://localhost:8000/turma/professor/${idProfessor}`, {
        method: 'GET',
        headers: {'Content-Type' : "application/json"}
    });

    if (resposta.status === 200) {
      const dados = await resposta.json();
      return dados;
    } else {
        alert("Turma não encontrada!");
    }
}

export async function cadastrarTurma(dados, autorizacao) {
  try {
    const resposta = await fetch(`http://127.0.0.1:8000/turma/cadastro`, {
      method: 'POST',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
    });


    const data = await resposta.json();
    console.log(data);
    return data;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }

}

export async function atualizarTurma(idTurma, dados, autorizacao) {
  try {
    const resposta = await fetch(`http://127.0.0.1:8000/turma/${idTurma}/alunos`, {
      method: 'PUT',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: JSON.stringify(dados)
    });

    const data = await resposta.json();
    console.log(data);
    return data;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }

}

export async function associaTurnaDisciplina(idTurma, idDisciplina, autorizacao) {
  try {
    const formData = new URLSearchParams();
    formData.append('id_disciplina', idDisciplina);
    formData.append('id_turma', idTurma);
    formData.append('ano_letivo', 2025);
    const resposta = await fetch(`http://127.0.0.1:8000/disciplina/turma`, {
      method: 'POST',
      headers: {
        'accept' : 'application/json',
        'Authorization' : `Bearer ${autorizacao}`,
        'Content-Type' : "application/json"},
      body: formData.toString()
    });

    const data = await resposta.json();
    console.log(data);
    return data;
  } catch (erro) {
    console.error("Erro:", erro);
    return null;
  }

}