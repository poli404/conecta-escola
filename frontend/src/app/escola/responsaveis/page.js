'use client';
import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import { getResponsaveisEscola } from "@/services/responsavelService";
import { useEffect, useState } from "react";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [responsaveis, setResponsaveis] = useState(null);
  
  useEffect(() => {
    const id = sessionStorage.getItem("idEscola");
    setIdEscola(id);

    (async () => {
      try {
        const dados = await getResponsaveisEscola(id);
        setResponsaveis(dados);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
        setResponsaveis([]);
      }
    })();
  }, []);
  
  const mostrarResponsaveis = responsaveis ?? [];
  
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
          <TabelasEscola dados={mostrarResponsaveis} tipo={"responsaveis"}/>
        </table>
      </div>
    </main>
  );
}
