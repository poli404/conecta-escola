"use client";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAlunosTurma } from "@/services/alunoService";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const idTurma = searchParams.get("id");
  const [alunos, setAlunos] = useState(null);
    
  useEffect(() => {
    (async () => {
          try {
            const dados = await getAlunosTurma(idTurma);
            setAlunos(dados);
          } catch (err) {
            console.error("Erro ao buscar alunos:", err);
            setAlunos([]);
          }
        })();
    }, []);
    
    const mostrarAlunos = alunos ?? [];
  //const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href={`adicionar?idTurma=${idTurma}`}>Transferir Aluno</Link>
        <table className={styles.table}>
          <thead>
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
    </main>
  );
}
