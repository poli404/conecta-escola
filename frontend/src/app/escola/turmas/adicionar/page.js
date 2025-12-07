'use client';
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { atualizarTurma, getTurma } from "@/services/turmaService";
import { getTodosAlunosEscola } from "@/services/alunoService";

export default function Home() {
  const alunosRef = useRef();
  const searchParams = useSearchParams();
  const idTurma = searchParams.get("idTurma");
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const dados = await getTurma(idTurma);
        setTurma(dados);
      } catch (err) {
        console.error("Erro ao buscar turma:", err);
        setTurma([]);
      }
    })();
    (async () => {
      try {
        const idEscola = sessionStorage.getItem('idEscola');
        const dados = await getTodosAlunosEscola(idEscola);
        setAlunos(dados);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
        setAlunos([]);
      }
    })();
  }, []);

  const mostrarAlunos = alunos ?? [];
  const mostrarTurma = turma ?? {};

  const [formData, setFormData] = useState({
    alunos_novos: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alunosRef.current) {
      formData.alunos_novos = []; // limpa o array de alunos para pegar só os selecionados
      const selected = alunosRef.current.selectedOptions;

      for (let i = 0; i < selected.length; i++) {
        formData.alunos_novos.push(selected[i].value);
      }
    }

    console.log(formData);
    const token = sessionStorage.getItem('access_token');
    const resultado = await atualizarTurma(idTurma, formData, token);
    if (resultado.status === 200) {
      alert('Alunos transferidos com sucesso!');
    } else { // 500 etc
      alert('Erro ao transferir alunos!');
    }
      
  };

  return (
    <main>
      <div className={styles.container}>
        <h1>Turma {mostrarTurma.identificador} do {mostrarTurma.ano_escolar}º Ano</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="alunos_novos">Selecione os alunos que deseja transferir para a <b>turma {mostrarTurma.identificador} do {mostrarTurma.anoEscolar}º Ano</b>:</label>
            <select id="alunos_novos" className={styles.field} name="alunos_novos" ref={alunosRef} multiple>
              {mostrarAlunos.map(
                (e) => (<option key={e.cpf} value={e.cpf}>{e.nome}</option>)
              )}
            </select>
          </div>
          <button type="submit">Transferir</button>
        </form>
      </div>
    </main>
  );
}

