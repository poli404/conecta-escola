import { MenuEscola } from "@/components/MenuEscola";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  //const professores = getAllProfessores();
  const professores = [{ id: 1, nome: "Dante Medeiros Filho" }, { id: 2, nome: "Aline Maria Malachini Miotto Amaral" }]; // Dados simulados
  
  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/professores/cadastro">Cadastrar Novo Professor</Link>

        <table className={styles.table}>
          <thead>
            <BarraPesquisa />
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
