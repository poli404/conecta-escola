'use client';
import { cadastrarDisciplina } from "@/services/disciplinaService";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { getTodosProfessoresEscola } from "@/services/professorService";
import { cadastrarFalta } from "@/services/faltaService";
import { MenuProfessor } from "@/components/MenuProfessor";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams('idAluno');
  const idAluno = searchParams.get('idAluno');
  const [formData, setFormData] = useState({
    data: '',
    quantidade: '1',
    id_disciplina: '',
    id_aluno: idAluno,
    justificada: 'false',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');
    const disciplina = sessionStorage.getItem('idDisciplina');
    formData.id_disciplina = disciplina;

    const resultado = await cadastrarFalta(formData, token);
    if (resultado.status === 201) {
      alert("Falta cadastrada com sucesso!");
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
        <h3>Adicionar Nova Falta</h3>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="data">Data:</label>
            <input className={styles.field} type="date" id="data" name="data" value={formData.data} onChange={handleChange} required/>  
            <label htmlFor="quantidade">Quantidade de Faltas:</label>
            <input className={styles.field} type="number" id="quantidade" name="quantidade" value={formData.quantidade} onChange={handleChange} required/>
            <label htmlFor="justificada">Falta Justificada?</label>
            <select className={styles.field} id="justificada" name="justificada" value={formData.justificada} onChange={handleChange} required>
              <option value='true'>SIM</option>
              <option value='false'>NÃO</option>
            </select>
          </div>
          <button type="submit">Adicionar Falta</button>
        </form>
      </div>
    </main>
  );
}

