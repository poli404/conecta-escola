"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getTurmasDisciplina } from "@/services/turmaService";
import { getDisciplina } from "@/services/disciplinaService";

export default function Home() {
    const searchParams = useSearchParams();
    const idDisciplina = searchParams.get("id");
    //const disciplina = getDisciplina(idDisciplina);
    const disciplina = {id : 1, nome : "Matemática", descricao: ""};
    //const turmas = getTurmasDisciplina(idDisciplina);
    const turmas = [{id : 1, anoEscolar: 3, identificador: "A"}, {id : 2, anoEscolar: 3, identificador: "B"}];

    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href="/escola/disciplinas/detalhes/editar">Editar Dados</Link>
                <div className={styles.card}>
                    <p><b>Nome:</b> {disciplina.nome}</p>
                    <p><b>Descrição:</b> {disciplina.descricao}</p>
                    <p><b>Turmas:</b> {
                        (
                        turmas.map((e) => 
                            <li className={styles.item}>{e.anoEscolar}º Ano ({e.identificador})</li>)
                        )}</p>
                </div>
            </div>
        </main>
    );
}