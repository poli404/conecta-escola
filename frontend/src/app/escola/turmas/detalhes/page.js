"use client";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAlunosTurma } from "@/services/alunoService";
import { useEffect, useState } from "react";
import { getDisciplinasTurma } from "@/services/disciplinaService";
import { getProfessor } from "@/services/professorService";

export default function Home() {
  const searchParams = useSearchParams();
  const idTurma = searchParams.get("id");
  const [alunos, setAlunos] = useState(null);
  const [disciplinas, setDisciplinas] = useState(null);
   const [professores, setProfessores] = useState(null);
    
  useEffect(() => {
    (async () => {
          try {
            const dados = await getAlunosTurma(idTurma);
            setAlunos(dados);
          } catch (err) {
            console.error("Erro ao buscar alunos:", err);
            setAlunos([]);
          }
        });

    (async () => {
          try {
            const dados = await getDisciplinasTurma(idTurma);
            setDisciplinas(dados);
          } catch (err) {
            console.error("Erro ao buscar disciplina:", err);
            setDisciplinas([]);
          }
        });

    (async () => {
          try {
            const dados = await getProfessoresTurma(idTurma);
            setProfessores(dados);
          } catch (err) {
            console.error("Erro ao buscar professor:", err);
            setProfessores([]);
          }
        })
        ();
    }, []);
    
    const mostrarAlunos = alunos ?? [];
    const mostrarDisciplinas = disciplinas ?? [];
    const mostrarProfessores = professores ?? [];


  //const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href={`adicionar?idTurma=${idTurma}`}>Transferir Aluno</Link>
        <table className={styles.table}>
          <thead>
            <th className={styles.titleTable}>Alunos</th>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Matrícula</th>
              <th className={styles.title}>Nome do Aluno</th>
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
            <th className={styles.titleTable}>Disciplinas</th>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Nome da Disciplina</th>
              <th className={styles.title}>Professor Responsável</th>
              <th></th>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarDisciplinas} tipo={"disciplinas"}/>
          <TabelasEscola dados={mostrarProfessores} tipo={"professores"}/>
        </table>
      </div>

    </main>
  );
}
