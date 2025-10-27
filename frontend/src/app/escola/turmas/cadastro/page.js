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
    anoEscolar: '',
    turma: ''
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
        <h1>Cadastro de Nova Turma</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Turma</h3>
            <label htmlFor="ano">Ano Escolar:</label>
            <input className={styles.field} type="number" id="anoEscolar" name="anoEscolar" value={formData.anoEscolar} onChange={handleChange} required/>
            <label htmlFor="turma">Turma:</label>
            <input className={styles.field} type="text" id="turma" name="turma" placeholder="A" value={formData.turma} onChange={handleChange} required/>
            <label htmlFor="alunos">Adicione alunos à turma:</label>
            <select className={styles.field} name="alunos" multiple>
              {alunos.map(
                (e) => (<option name={e.id}>{e.nome}</option>)
              )}
            </select>
          </div>
          <button type="submit">Cadastrar Turma</button>
        </form>
      </div>
    </main>
  );
}

