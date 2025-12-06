import { MenuProfessor } from "@/components/MenuProfessor";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";
import { getTurmasDisciplina } from "@/services/turmaService";

export default function Home() {
  // const turmas = getTurmasDisciplina(idDisciplina);
  const turmas = [{id : 1, anoEscolar: '1º ano', turma: 'A'}];

  return (
    <main>
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
            <thead>
                <BarraPesquisa col={"3"}/>
                <tr>
                <th className={styles.title}>Código</th>
                <th className={styles.title}>Ano Escolar</th>
                <th className={styles.title}>Turma</th>
                <th></th>
                </tr>
            </thead>
            <CorpoTabela dados={turmas} tipo={"turmas"} usuario="professor"/>
            </table>
      </div>
    </main>
  );
}
