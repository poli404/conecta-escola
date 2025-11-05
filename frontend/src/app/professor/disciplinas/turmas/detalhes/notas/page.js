import { MenuProfessor } from "@/components/MenuProfessor";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAlunos(turma);
  const notas = [{ id: 1, idAluno: 1, nota: 10.0, idDisciplina: 1, data: '30/4/2025' }, { id: 2, idAluno: 1, nota: 10.0, idDisciplina: 1, data: '3/8/2025' }]; // Dados simulados

  return (
    <main>
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
            <thead>
               <BarraPesquisa col="3"/>
            <tr>
              <th className={styles.title}>Matrícula Aluno</th>
              <th className={styles.title}>Data</th>
              <th className={styles.title}>Nota</th>
              <th></th>
            </tr>
            </thead>
            <CorpoTabela dados={notas} tipo={"notas"} usuario="professor"/>
        </table>
      </div>
    </main>
  );
}
