'use client';
import { useRef } from "react";
import styles from "./page.module.css";
import { useState } from 'react';
import { useSearchParams } from "next/navigation";

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
  const alunosRef = useRef();
  const searchParams = useSearchParams();

  const idTurma = searchParams.get("idTurma");
  //const turma = getTurma(idTurma);
  const turma = {id : 1, anoEscolar: 2, turma : "A", alunos: []};
  //const alunos = getAlunosAnoEscolar(turma.anoEscolar);
  const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }];

  const [formData, setFormData] = useState({
    alunos: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alunosRef.current) {
      formData.alunos = []; // limpa o array de alunos para pegar só os selecionados
      const selected = alunosRef.current.selectedOptions;

      for (let i = 0; i < selected.length; i++) {
        formData.alunos.push(selected[i].value);
      }
    }

    console.log(formData);
    //const resultado = await adicionarAlunosTurma(idTurma, turma);
    if (resultado.status == 201) {
      alert('Alunos transferidos com sucesso!');
    } else { // 500 etc
      alert('Erro ao transferir alunos!');
    }
      
  };

  return (
    <main>
      <div className={styles.container}>
        <h1>Turma {turma.turma} do {turma.anoEscolar}º Ano</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="alunos">Selecione os alunos que deseja transferir para a <b>turma {turma.turma} do {turma.anoEscolar}º Ano</b>:</label>
            <select className={styles.field} name="alunos" ref={alunosRef} multiple>
              {alunos.map(
                (e) => (<option key={e.id} value={e.id}>{e.nome}</option>)
              )}
            </select>
          </div>
          <button type="submit">Transferir</button>
        </form>
      </div>
    </main>
  );
}

