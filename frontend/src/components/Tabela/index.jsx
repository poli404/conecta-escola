import Link from "next/link";
import Image from "next/image";
import styles from "./tabela.module.css";
import eye from "../../../public/eye_icon.svg";
import lupa from "../../../public/search_icon.svg";
import notes from "../../../public/notes_icon.svg";

export const BarraPesquisa = ({ col }) => {
    return (
        <tr>
            <th colSpan={col}>
                <input className={styles.field} type="text" placeholder="Pesquisar"/>
            </th>
            <th className={styles.center}>
                <button className={styles.searchButton} type="submit">
                    <Image src={lupa} width="20" height="20" alt=" Pesquisar"/>
                </button>
            </th>
        </tr>
    );
}

export const TabelasEscola = ({ dados, tipo }) => {
    if (tipo == "turmas") {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>{`${dado.ano_escolar}º ano`}</td>
                <td className={styles.center}>{dado.identificador}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/detalhes?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == "disciplinas") {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>{dado.descricao}</td>
                <td className={styles.center}>
                    <Link href={`${tipo}/detalhes?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'responsaveis') {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.cpf}>
                <td className={styles.left}>{dado.nome}</td>
                <td className={styles.left}>{dado.aluno}</td>
                <td className={styles.left}>{dado.emailPessoal}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/perfil?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } // professores e alunos
    return (
    <tbody>
        {dados.map((dado, index) => (
        <tr key={dado?.id ?? dado?.cpf ?? index}>
            <td className={styles.left}>{dado.nome}</td>
            <td className={styles.left}>{dado.cpf}</td>
            <td className={styles.center}>
                <Link className={styles.detalhes} href={`/escola/${tipo}/perfil?id=${dado.cpf}`}>
                    <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                </Link>
            </td>
        </tr>
        ))}
    </tbody>
    );
}

export const TabelasProfessor = ({ dados, tipo }) => {
    if (tipo == 'disciplinas') {
        return (
            <tbody>
                {dados.map((dado) => (
                <tr key={dado.id}>
                    <td className={styles.center}>{dado.id}</td>
                    <td className={styles.left}>{dado.descricao}</td>
                    <td className={styles.center}>
                        <Link className={styles.destaque} href={`${tipo}/turmas?idDisciplina=${dado.id}`}>Ver Turmas</Link>
                    </td>
                </tr>
                ))}
            </tbody>
            );    
    } else if (tipo == "turmas") {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.center}>{`${dado.ano_escolar}º ano`}</td>
                <td className={styles.center}>{dado.identificador}</td>
                <td className={styles.center}>
                    <Link className={styles.destaque} href={`${tipo}/alunos?idTurma=${dado.id}`}>Ver Alunos</Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'alunos'){
        return(
            <tbody>
            {dados.map((dado) => (
            <tr key={dado.cpf}>
                <td className={styles.left}>{dado.nome}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/detalhes?idAluno=${dado.cpf}`}>
                        <Image src={notes} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'detalhes'){
        return(
            <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.data}</td>
                <td className={styles.center}>{dado.valor}</td>
                <td className={styles.center}>
                    <Link className={styles.destaque} href={`${tipo}?id=${dado.id}`}>Alterar Nota</Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'faltas'){
        return(
            <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.data}</td>
                <td className={`${styles.center} ${styles.destaque}`}>
                    <Link href="" className={styles.excluir}>Excluir</Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    }
}