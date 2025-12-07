'use client';
import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa, TabelasProfessor } from "@/components/Tabela";
import { getDisciplinasProfessor } from "@/services/disciplinaService";
import { useEffect, useState } from "react";

export default function Home() {
  const [idProfessor, setIdProfessor] = useState(null);
  const [disciplinas, setDisciplinas] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("idUsuario");
    setIdProfessor(id);

    (async () => {
          try {
            const dados = await getDisciplinasProfessor(id);
            setDisciplinas(dados);
          } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
            setDisciplinas([]);
          }
        })();
    }, []);
  
  const mostrarDisciplinas = disciplinas ?? [];

  return (
    <main>
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Nome</th>
              <th></th>
            </tr>
          </thead>
          <TabelasProfessor dados={mostrarDisciplinas} tipo="disciplinas"/>
        </table>
      </div>
    </main>
  );
}
