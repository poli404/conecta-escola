'use client';
import { cadastrarDisciplina } from "@/services/disciplinaService";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  //const idDisciplina ...
  const [formData, setFormData] = useState({
    nome: '',
    descricao: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await cadastrarDisciplina(formData);
    if (resultado) {
      alert("Disciplina alterada com sucesso!");
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
        <h1>Editar Informações de Disciplina</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Disciplina</h3>
            <label htmlFor="nome">Nome da Disciplina:</label>
            <input className={styles.field} type="text" id="nome" name="nome" placeholder="Matemática" value={formData.nome} onChange={handleChange} required/>
            <label htmlFor="descricao">Adicione a descrição da disciplina:</label>
            <input className={styles.field} type="text" id="descricao" name="descricao" placeholder="Explique o principais objetivos..." value={formData.descricao} onChange={handleChange} required/>
          </div>
          <button type="submit">Atualizar Disciplina</button>
        </form>
      </div>
    </main>
  );
}

