import { MenuEscola } from "@/components/MenuEscola";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";
import Link from "next/link";
import styles from "./page.module.css";
import { getTodosProfessoresEscola } from "@/services/professorService";

export default function Home() {
  idEscola = sessionStorage.getItem("idEscola");
  //const professores = getTodosProfessoresEscola(idEscola);
  const professores = [{ id: 1, nome: "Dante Medeiros Filho" }, { id: 2, nome: "Aline Maria Malachini Miotto Amaral" }]; // Dados simulados
  
  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/professores/cadastro">Cadastrar Novo Professor</Link>

        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Identificação</th>
              <th className={styles.title}>Nome do Docente</th>
              <th className={styles.title}/>
            </tr>
          </thead>
          <CorpoTabela dados={professores} tipo={"professores"}/>
        </table>
      </div>
    </main>
  );
}
