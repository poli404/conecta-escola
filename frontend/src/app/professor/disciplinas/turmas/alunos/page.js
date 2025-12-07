'use client';
import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { BarraPesquisa, TabelasProfessor } from "@/components/Tabela";
import { getAlunosTurma } from "@/services/alunoService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const idTurma = searchParams.get("idTurma");
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
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Matrícula</th>
              <th className={styles.title}>Nome do Aluno</th>
              <th className={`${styles.title} ${styles.center}`}>Notas e Faltas</th>
            </tr>
          </thead>
          <TabelasProfessor dados={mostrarAlunos} tipo={"alunos"}/>
        </table>
      </div>
    </main>
  );
}
