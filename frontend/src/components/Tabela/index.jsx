import Link from "next/link";
import Image from "next/image";
import styles from "./tabela.module.css";
import eye from "../../../public/eye_icon.svg";
import lupa from "../../../public/search_icon.svg";

//lógica de pesquisa no banco de dados
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

export const CorpoTabela = ({ dados, tipo, usuario='escola' }) => {
    if (usuario ==='professor') {
        if (tipo == 'disciplinas') {
       return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}?${dado.id}`}>{dado.nome}</Link>
                </td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/turmas?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );    
    }else if (tipo == "turmas") {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}?${dado.id}`}>{dado.anoEscolar}</Link>
                </td>
                <td className={styles.center}>{dado.turma}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/detalhes?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
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
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}?${dado.id}`}>{dado.nome}</Link>
                </td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/notas?id=${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'notas'){
        return(
             <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.idAluno}</td>
                <td className={styles.center}>{dado.data}</td>
                <td className={`${styles.center} ${styles.destaque}`}>
                    <Link className={styles.destaque} href={`${tipo}?${dado.id}`}>{dado.nota}</Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    }
    } else {
            if (tipo == "turmas") {
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}?${dado.id}`}>{dado.anoEscolar}</Link>
                </td>
                <td className={styles.center}>{dado.turma}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/detalhes?id=${dado.id}`}>
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
            <tr key={dado.id}>
                <td className={styles.left}>{dado.nome}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}/perfil?${dado.id}`}>{dado.aluno}</Link>
                </td>
                <td className={styles.left}>{dado.contato}</td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/perfil?${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    }
        return (
        <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{dado.id}</td>
                <td className={styles.left}>
                    <Link className={styles.text} href={`${tipo}/perfil?${dado.id}`}>{dado.nome}</Link>
                </td>
                <td className={styles.center}>
                    <Link className={styles.detalhes} href={`${tipo}/perfil?${dado.id}`}>
                        <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
        );
    }
}