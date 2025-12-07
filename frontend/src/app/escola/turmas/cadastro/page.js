'use client';
import { useRef } from "react";
import styles from "./page.module.css";
import { useState } from 'react';
import { getTodosAlunosEscolaAnoEscolar } from "@/services/alunoService";
import { cadastrarTurma } from "@/services/turmaService";

export default function Home() {
  const alunosRef = useRef();
  let alunos = []; // inicia sem alunos -> esperar o ano escolar
  
  const [formData, setFormData] = useState({
    ano_escolar: '',
    identificador: '',
    alunos: [],
    id_escola: '',
  });

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
    const idEscola = sessionStorage.getItem('idEscola');
    formData.id_escola = idEscola;
    const resultado = await cadastrarTurma(formData, token);
    alert('Turma cadastrada!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    });

    if (e.target.name === 'ano_escolar') {
      const idEscola = sessionStorage.getItem('idEscola');
      alunos = getTodosAlunosEscolaAnoEscolar(idEscola, formData.ano_escolar);
    }
  };

  console.log(formData);

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
              {alunos.map(
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

