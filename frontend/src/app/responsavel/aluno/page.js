'use client';
import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { TabelasExterno, TabelasProfessor } from "@/components/Tabela";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAluno, getAlunosResponsavel, getFaltas, getNotas } from "@/services/alunoService";
import { useEffect, useState } from "react";
import { MenuResponsavel } from "@/components/MenuResponsavel";

export default function Home() {
  const searchParams = useSearchParams();
  const idAluno = searchParams.get('idAluno');
  const [notas, setNotas] = useState(null);
  const [faltas, setFaltas] = useState(null);
  const [alunos, setAlunos] = useState(null);
  const [aluno, setAluno] = useState(null);
      
  useEffect(() => {
    const id = sessionStorage.getItem("idUsuario");
    (async () => {
      
      try {
        const token = sessionStorage.getItem('access_token');

        const notasData = await getNotas(idAluno, token);
        const faltasData = await getFaltas(idAluno, token);
        const alunoData = await getAluno(idAluno, token);
        const alunosData = await getAlunosResponsavel(id);
        setNotas(notasData);
        setFaltas(faltasData);
        setAluno(alunoData);
        setAlunos(alunosData);
      } catch (err) {
        console.error("Erro ao buscar notas e faltas:", err);
        setNotas([]);
        setFaltas([]);
        setAlunos([]);
        setAluno({});
      }
    })();
    }, []);
      
  const mostrarNotas = notas ?? [];
  const mostrarFaltas = faltas ?? [];
  const mostrarAlunos = alunos ?? [];
  const mostrarAluno = aluno ?? {};

  return (
    <main>
      <MenuResponsavel alunos={mostrarAlunos}/>
      <h3 className={styles.aluno}><b>Aluno:</b> {mostrarAluno.nome}</h3>
      <div className={styles.container}>
          <div className={styles.secao}>
            <table className={styles.table} id="tabelaNotas">
            <thead>
              <tr className={`${styles.title}`}><th colSpan={2}>Notas</th></tr>
              <tr>
                <th className={styles.title}>Data da Avaliação</th>
                <th className={styles.title}>Nota</th>
              </tr>
            </thead>
            <TabelasExterno dados={mostrarNotas} tipo={"notas"}/>
          </table>
          </div>
          <div>
            <table className={styles.table} id="tabelaFaltas">
            <thead>
              <tr className={`${styles.title}`}><th colSpan={2}>Faltas</th></tr>
              <tr>
                <th className={styles.title}>Data</th>
                <th className={styles.title}>Quantidade</th>
              </tr>
              </thead>
              <TabelasExterno dados={mostrarFaltas} tipo={"faltas"}/>
          </table>
          </div>
      </div>
    </main>
  );
}
