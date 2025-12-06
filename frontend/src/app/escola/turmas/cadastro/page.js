'use client';
import { useRef } from "react";
import styles from "./page.module.css";
import { useState } from 'react';
import { getTodosAlunosEscolaAnoEscolar } from "@/services/alunoService";
import { cadastrarTurma } from "@/services/turmaService";

export default function Home() {
  const alunosRef = useRef();
  const alunos = []; // inicia sem alunos -> esperar o ano escolar
  alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }];

  const [formData, setFormData] = useState({
    anoEscolar: '',
    turma: '',
    alunos: []
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
    const resultado = await cadastrarTurma(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    });

    if (e.target.name === 'anoEscolar') {
      //const alunos = getTodosAlunosEscolaAnoEscolar(idEscola, formData.anoEscolar);
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
            <label htmlFor="ano">Ano Escolar:</label>
            <input className={styles.field} type="number" id="anoEscolar" name="anoEscolar" value={formData.anoEscolar} onChange={handleChange} required/>
            <label htmlFor="turma">Turma:</label>
            <input className={styles.field} type="text" id="turma" name="turma" placeholder="A" value={formData.turma} onChange={handleChange} required/>
            <label htmlFor="alunos">Adicione alunos à turma:</label>
            <select className={styles.field} name="alunos" ref={alunosRef} multiple>
              {alunos.map(
                (e) => (<option key={e.id} value={e.id}>{e.nome}</option>)
              )}
            </select>
          </div>
          <button type="submit">Cadastrar Turma</button>
        </form>
      </div>
    </main>
  );
}

