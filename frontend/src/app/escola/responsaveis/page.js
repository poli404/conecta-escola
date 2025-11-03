import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAllAlunos();
  const responsaveis = [{ id: 1, nome: "Sulema de Mello Amaro Policante", contato: '(44)999355633', aluno: ["Maria Eduarda de Mello Policante"] }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/responsaveis/cadastro">Cadastrar Novo Responsável</Link>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="3"/>
            <tr>
              <th className={styles.title}>Nome</th>
              <th className={styles.title}>Aluno</th>
              <th className={styles.title}>Contato</th>
              <th></th>
            </tr>
          </thead>
          <CorpoTabela dados={responsaveis} tipo={"responsaveis"}/>
        </table>
      </div>
    </main>
  );
}
