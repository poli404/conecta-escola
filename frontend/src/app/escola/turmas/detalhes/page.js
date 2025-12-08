"use client";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { TabelasEscola } from "@/components/Tabela";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAlunosTurma } from "@/services/alunoService";
import { useEffect, useState } from "react";
import { getDisciplinasTurma } from "@/services/disciplinaService";

export default function Home() {
  const searchParams = useSearchParams();
  const idTurma = searchParams.get("id");
  const [alunos, setAlunos] = useState(null);
  const [disciplinas, setDisciplinas] = useState(null);
    
  useEffect(() => {
    (async () => {
      try {
        const alunosData = await getAlunosTurma(idTurma);
        const disciplinasData = await getDisciplinasTurma(idTurma);
        setAlunos(alunosData);
        setDisciplinas(disciplinasData);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
        setAlunos([]);
        setDisciplinas([]);
      }
    })();
  }, []);
    
  const mostrarAlunos = alunos ?? [];
  const mostrarDisciplinas = disciplinas ?? [];
  console.log(mostrarAlunos);

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href={`adicionar?idTurma=${idTurma}`}>Transferir Aluno</Link>
        <table className={styles.table}>
          <thead>
            <tr><th className={styles.titleTable}>Alunos</th></tr>
            <tr>
              <th className={styles.title}>Nome do Aluno</th>
              <th className={styles.title}>CPF</th>
              <th></th>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarAlunos} tipo={"alunos"}/>
        </table>
      </div>

      <div className={styles.container}>
        <Link className={styles.fakeButton} href="">Adicionar Disciplina</Link>

        <table className={styles.table}>
          <thead>
            <tr><th className={styles.titleTable}>Disciplinas</th></tr>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Nome da Disciplina</th>
              <th className={styles.title}>Professor Responsável</th>
              <th></th>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarDisciplinas} tipo={"disciplinasTurmas"}/>
        </table>
      </div>

    </main>
  );
}
