'use client';
import styles from "./page.module.css";
import { useState } from 'react';

async function cadastrarEscola(dadosEscola) {
  const response = await fetch('http://localhost:8000/escola/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosEscola)
  });

  return response;
}

export default function Home() {
  //const alunos = getAllAlunos();
  const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }];

  const [formData, setFormData] = useState({
    nome: '',
    descricao: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const resultado = await cadastrarEscola(formData);
    if (resultado.status == 201) {
      alert('Escola cadastrada com sucesso!');
    } else if (resultado.status == 409) {
      alert('Escola já cadastrada!');
    } else { // 500 etc
      alert('Erro ao cadastrar escola!');
    }
      
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>
      <div className={styles.container}>
        <h1>Cadastro de Nova Disciplina</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Disciplina</h3>
            <label htmlFor="nome">Nome da Disciplina:</label>
            <input className={styles.field} type="text" id="nome" name="nome" placeholder="Matemática" value={formData.nome} onChange={handleChange} required/>
            <label htmlFor="descricao">Adicione a descrição da disciplina:</label>
            <input className={styles.field} type="text" id="descricao" name="descricao" placeholder="Explique o principais objetivos..." value={formData.descricao} onChange={handleChange} required/>
          </div>
          <button type="submit">Cadastrar Disciplina</button>
        </form>
      </div>
    </main>
  );
}

