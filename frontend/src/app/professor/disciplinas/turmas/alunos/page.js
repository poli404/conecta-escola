import { MenuProfessor } from "@/components/MenuProfessor";
import Link from "next/link";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa, TabelasProfessor } from "@/components/Tabela";
import { getAlunosTurma } from "@/services/alunoService";

export default function Home() {
  //const Aalunos = getAlunosTurma(idTurma);
  const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

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
          <TabelasProfessor dados={alunos} tipo={"alunos"}/>
        </table>
      </div>
    </main>
  );
}
