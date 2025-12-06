import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/TabelaExternos";
import { MenuAluno } from "@/components/MenuAluno";
import getNotas from "@/services/alunoService";

export default function Home() {
  const notas = getNotas(idAluno);
  if (notas == null) {
    notas = [{id: 1, data: "10/02/2025", nota: 9.2, idAluno : 1, idDisciplina: 3}];
  }

  return (
    <main>
      <MenuAluno/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa dados={notas}/>
            <tr>
              <th className={styles.title}>Disciplina</th>
              <th className={styles.title}>Data Avaliação</th>
              <th className={styles.title}>Nota Avaliação</th>
            </tr>
          </thead>
          <CorpoTabela dados={notas} tipo="notas"/>
        </table>
      </div>
    </main>
  );
}
