"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getAluno } from "@/services/alunoService";

export default function Home() {
    const searchParams = useSearchParams();
    const idAluno = searchParams.get("id");
    //const aluno = getAluno(idAluno);

    const aluno = {id: 1, nome: "Maria Eduarda de Mello Policante", cpf: "143.742.909-23", endereco: "Rua Horário Hacanello, 5350 - 1403", telefone: "(44) 99935-5633", tipoSangue: "O+", anoEscolar: "9", turma: "A", deficiencia: "Altas Habilidades", alergia: null};
    
    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href="/escola/alunos/perfil/editar">Editar Dados</Link>
                <div className={styles.card}>
                    {(aluno.foto != null) && (<Image src={aluno.foto} width="64" height="64" alt="Foto do Aluno"/>)}
                    <div>
                        <p><b>Matrícula:</b> {aluno.id}</p>
                        <p><b>Nome:</b> {aluno.nome}</p>
                        <p><b>CPF:</b> {aluno.cpf}</p>
                        <p><b>Endereço:</b> {aluno.endereco}</p>
                    </div>
                    <div>
                        <p><b>Ano Escolar:</b> {aluno.anoEscolar}</p>
                        <p><b>Turma:</b> {aluno.turma}</p>
                        <p><b>Tipo Sanguíneo:</b> {aluno.tipoSangue}</p>
                        {(aluno.deficiencia != null) && (
                            <p><b>Deficiência:</b> {aluno.deficiencia}</p>
                        )}
                        {(aluno.alergia != null) && (
                            <p><b>Alergias:</b> {aluno.alergia}</p>
                        )}
                    </div>
                </div>
                <div className={styles.card}>
                    <a className={styles.title} href={`/escola/responsaveis/perfil?id=${aluno.responsavel}`}>Responsável</a>
                    <div>
                        <p><b>Nome:</b> {aluno.responsavel}</p>
                        <p><b>Contato:</b> {aluno.telefone}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}