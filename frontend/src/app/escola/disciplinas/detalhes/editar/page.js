'use client';
import { atualizarDisciplina, getDisciplina } from "@/services/disciplinaService";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import { associaTurnaDisciplina, getTodasTurmasEscola } from "@/services/turmaService";
import { useSearchParams } from "next/navigation";
import { getTodosProfessoresEscola } from "@/services/professorService";

export default function Home() {
  const turmasRef = useRef();
  const searchParams = useSearchParams();
  const idDisciplina = searchParams.get("id");
  
  const [disciplina, setDisciplina] = useState(null);
  const [turmas, setTurmas] = useState(null);
  const [professores, setProfessores] = useState(null);

  useEffect(() => {
  (async () => {
      try {
      const dados = await getDisciplina(idDisciplina);
      setDisciplina(dados);
      } catch (err) {
      console.error("Erro ao buscar disciplina:", err);
      setDisciplina([]);
      }
  })();
  (async () => {
      try {
        const idEscola = sessionStorage.getItem('idEscola');
        const dados = await getTodasTurmasEscola(idEscola);
        const profs = await getTodosProfessoresEscola(idEscola);
        setTurmas(dados);
        setProfessores(profs);
      } catch (err) {
          console.error("Erro ao buscar turmas:", err);
          setTurmas([]);
          setProfessores([]);
      }
  })();
  }, []);

  const mostrarTurmas = turmas ?? [];
  const mostrarProfessores = professores ?? [];
  const mostrarDisciplina = disciplina ?? {};
  const mostrarProfessor = mostrarDisciplina.professor ?? {};

  const [formData, setFormData] = useState({
    descricao: mostrarDisciplina.descricao,
    professor: mostrarProfessor.cpf
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');

    if (turmasRef.current) {
      const selected = turmasRef.current.selectedOptions;

      for (let i = 0; i < selected.length; i++) {
        await associaTurnaDisciplina(selected[i].value, idDisciplina, token);
      }
    }

    const resultado = await atualizarDisciplina(idDisciplina, formData);
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

  formData.descricao = mostrarDisciplina.descricao;

  return (
    <main>
      <div className={styles.container}>
        <h3>Editar Disciplina: {mostrarDisciplina.descricao}</h3>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Disciplina</h3>
            <label htmlFor="descricao">Nome da Disciplina:</label>
            <input className={styles.field} type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required/>
            <label htmlFor="professor">Professor:</label>
            <select className={styles.field} id="professor" name="professor" value={formData.professor} onChange={handleChange}>
              {mostrarProfessores.map((p) => <option key={p.cpf} value={p.cpf}>{p.nome}</option>)}
            </select>
            <label>Adicione turmas à disciplina:</label>
            <select className={styles.field} ref={turmasRef} id="turmas" name="turmas" onChange={handleChange} multiple>
              {mostrarTurmas.map((t) => <option key={t.id} value={t.id}>{`${t.ano_escolar}º ano ${t.identificador}`}</option>)}
            </select>
          </div>
          <button type="submit">Atualizar Disciplina</button>
        </form>
      </div>
    </main>
  );
}

