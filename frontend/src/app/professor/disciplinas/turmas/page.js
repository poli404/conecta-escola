'use client';
import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { BarraPesquisa, TabelasProfessor } from "@/components/Tabela";
import { getTurmasDisciplina } from "@/services/turmaService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const idDisciplina = searchParams.get("idDisciplina");
  const [turmas, setTurmas] = useState(null);
  
  useEffect(() => {
    (async () => {
          try {
            const dados = await getTurmasDisciplina(idDisciplina);
            setTurmas(dados);
          } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
            setTurmas([]);
          }
        })();
    }, []);
    
    const mostrarTurmas = turmas ?? [];
  //const turmas = [{id : 1, anoEscolar: '1', turma: 'A'}];

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
            <TabelasProfessor dados={mostrarTurmas} tipo={"turmas"}/>
            </table>
      </div>
    </main>
  );
}
