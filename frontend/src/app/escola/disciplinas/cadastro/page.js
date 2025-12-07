'use client';
import { cadastrarDisciplina } from "@/services/disciplinaService";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { getTodosProfessoresEscola } from "@/services/professorService";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [professores, setProfessores] = useState(null);
    
  useEffect(() => {
      const id = sessionStorage.getItem("idEscola");
      setIdEscola(id);
  
      (async () => {
        try {
          const dados = await getTodosProfessoresEscola(id);
          setProfessores(dados);
        } catch (err) {
          console.error("Erro ao buscar professores:", err);
          setProfessores([]);
        }
      })();
    }, []);
  
    const mostrarProfessores = professores ?? [];

  const [formData, setFormData] = useState({
    descricao: '',
    id_professor: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');
    const resultado = await cadastrarDisciplina(formData, token);
    if (resultado.status === 201) {
      alert("Disciplina cadastrada com sucesso!");
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
      <div className={styles.container}>
        <h1>Cadastro de Nova Disciplina</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Disciplina</h3>
            <label htmlFor="descricao">Nome da Disciplina:</label>
            <input className={styles.field} type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required/>
            <label htmlFor="id_professor">Professor Responsável:</label>
            <select className={styles.field} id="id_professor" name="id_professor" value={formData.id_professor} onChange={handleChange} required>
              {mostrarProfessores.map((e) => 
              <option key={e.cpf} value={e.cpf}>
                {e.nome}
              </option>)}
              <option value=''>Selecione o professor</option>
            </select>
          </div>
          <button type="submit">Cadastrar Disciplina</button>
        </form>
      </div>
    </main>
  );
}

