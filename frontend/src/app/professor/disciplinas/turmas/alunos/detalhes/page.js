'use client';
import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { TabelasProfessor } from "@/components/Tabela";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAluno, getFaltas, getNotas } from "@/services/alunoService";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const idAluno = searchParams.get('idAluno');
  const [notas, setNotas] = useState(null);
  const [faltas, setFaltas] = useState(null);
  const [aluno, setAluno] = useState(null);
      
  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem('access_token');

        const notasData = await getNotas(idAluno, token);
        const faltasData = await getFaltas(idAluno);
        const alunoData = await getAluno(idAluno, token);
        setNotas(notasData);
        setFaltas(faltasData);
        setAluno(alunoData);
      } catch (err) {
        console.error("Erro ao buscar notas e faltas:", err);
        setNotas([]);
        setFaltas([]);
        setFaltas({});
      }
    })();
    }, []);
      
  const mostrarNotas = notas ?? [];
  const mostrarFaltas = faltas ?? [];
  const mostrarAluno = aluno ?? {};

  return (
    <main>
      <MenuProfessor/>
      <h3 className={styles.aluno}><b>Aluno:</b> {mostrarAluno.nome}</h3>
      <div className={styles.container}>
          <div className={styles.secao}>
            <table className={styles.table} id="tabelaNotas">
            <caption className={styles.title}>Notas</caption>
            <thead>
            <tr>
              <th className={styles.title}>Data da Avaliação</th>
              <th className={styles.title}>Nota</th>
              <th></th>
            </tr>
            </thead>
            <TabelasProfessor dados={mostrarNotas} tipo={"detalhes"}/>
          </table>
          <Link className={styles.fakeButton} href={`nota?idAluno=${idAluno}`}>Adicionar Nota</Link>
          </div>
          <div>
            <table className={styles.table} id="tabelaFaltas">
            <caption className={styles.title}>Faltas</caption>
            <thead>
              <tr>
                <th className={styles.title}>Data</th>
                <th></th>
              </tr>
              </thead>
              <TabelasProfessor dados={mostrarFaltas} tipo={"faltas"}/>
          </table>
          <Link className={styles.fakeButton} href={`falta?idAluno=${idAluno}`}>Adicionar Falta</Link>
          </div>
      </div>
    </main>
  );
}
