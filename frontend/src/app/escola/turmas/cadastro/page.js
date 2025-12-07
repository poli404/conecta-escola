'use client';
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useState } from 'react';
import { getTodosAlunosEscola, getTodosAlunosEscolaAnoEscolar } from "@/services/alunoService";
import { cadastrarTurma } from "@/services/turmaService";

export default function Home() {
  const alunosRef = useRef();
  const [alunos, setAlunos] = useState(null);
  const [idEscola, setIdEscola] = useState(null);
  
  const [formData, setFormData] = useState({
    ano_escolar: '',
    identificador: '',
    alunos: [],
    id_escola: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const idEscola = sessionStorage.getItem('idEscola');
        setIdEscola(idEscola);
        const dados = await getTodosAlunosEscola(idEscola);
        setAlunos(dados);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
        setAlunos([]);
      }
    })();
  }, []);

  const mostrarAlunos = alunos ?? []

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alunosRef.current) {
      formData.alunos = [];
      const selected = alunosRef.current.selectedOptions;

      for (let i = 0; i < selected.length; i++) {
        formData.alunos.push(selected[i].value); // adiciona o id do aluno ao array de alunos
      }
    }
    const token = sessionStorage.getItem('access_token');
    formData.id_escola = idEscola;
    const resultado = await cadastrarTurma(formData, token);
    console.log(resultado);
    alert('Turma cadastrada!');
  };

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    });
  };

  return (
    <main>
      <div className={styles.container}>
        <h1>Cadastro de Nova Turma</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Turma</h3>
            <label htmlFor="ano_escolar">Ano Escolar:</label>
            <input className={styles.field} type="number" id="ano_escolar" name="ano_escolar" value={formData.ano_escolar} onChange={handleChange} required/>
            <label htmlFor="identificador">Turma:</label>
            <input className={styles.field} type="text" id="identificador" name="identificador" placeholder="A" value={formData.identificador} onChange={handleChange} required/>
            <label htmlFor="alunos">Adicione alunos à turma:</label>
            <select className={styles.field} name="alunos" ref={alunosRef} multiple>
              {mostrarAlunos.map(
                (e) => (<option key={e.cpf} value={e.cpf}>{e.nome}</option>)
              )}
            </select>
          </div>
          <button type="submit">Cadastrar Turma</button>
        </form>
      </div>
    </main>
  );
}

