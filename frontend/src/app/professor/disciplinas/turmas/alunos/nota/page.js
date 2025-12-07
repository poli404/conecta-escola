'use client';
import styles from "./page.module.css";
import { useState } from 'react';
import { MenuProfessor } from "@/components/MenuProfessor";
import { useSearchParams } from "next/navigation";
import { cadastrarNota } from "@/services/notaService";

export default function Home() {
  const searchParams = useSearchParams('idAluno');
  const idAluno = searchParams.get('idAluno');
  const [formData, setFormData] = useState({
    data: '',
    valor: '',
    id_disciplina: '',
    id_aluno: idAluno,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');
    const disciplina = sessionStorage.getItem('idDisciplina');
    formData.id_disciplina = disciplina;

    const resultado = await cadastrarNota(formData, token);
    if (resultado.status === 201) {
      alert("Nota cadastrada com sucesso!");
    } else {
      alert("Erro ao cadastrar disciplina!");
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
      <MenuProfessor/>
      <div className={styles.container}>
        <h3>Nova Avaliação</h3>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="data">Data:</label>
            <input className={styles.field} type="date" id="data" name="data" value={formData.data} onChange={handleChange} required/>  
            <label htmlFor="valor">Nota:</label>
            <input className={styles.field} type="number" id="valor" name="valor" placeholder="6.0" value={formData.valor} onChange={handleChange} required/>
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </main>
  );
}

