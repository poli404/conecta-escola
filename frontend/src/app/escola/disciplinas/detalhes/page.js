"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

async function getDisciplina() {
    const searchParams = useSearchParams();
    const idAluno = searchParams.get("id");

    const resposta = await fetch(`https://localhost:8000/`);

    if (resposta.status === 200) {
        return JSON(resposta.body);
    } else {
        alert("Disciplina não encontrada!");
    }
}

export default function Home() {
    const searchParams = useSearchParams();
    const idDisciplina = searchParams.get("id");
    //const getDisciplina(idDisciplina);
    const disciplina = {id : 1, nome : "Matemática", descricao: ""};
    //const turmas = getTurmasDisciplina(idDisciplina);
    const turmas = [{id : 1, anoEscolar: 3, identificador: "A"}, {id : 2, anoEscolar: 3, identificador: "B"}];

    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href="">Editar Dados</Link>
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