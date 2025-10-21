import Link from "next/link";
import Image from "next/image";
import styles from "./tabela.module.css";
import eye from "../../../public/eye_icon.svg";
import lupa from "../../../public/search_icon.svg";

//lógica de pesquisa no banco de dados
export const BarraPesquisa = () => {
    return (
        <tr>
            <th colSpan="2">
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

export const CorpoTabela = ({ dados, tipo }) => {
  return (
    <tbody>
        {dados.map((dado) => (
        <tr key={dado.id}>
            <td className={styles.center}>{dado.id}</td>
            <td className={styles.left}>
                <Link className={styles.text} href={`escola/${tipo}/${dado.id}`}>{dado.nome}</Link>
            </td>
            <td className={styles.center}>
                <Link className={styles.detalhes} href={`escola/${tipo}/${dado.id}`}>
                    <Image src={eye} width="20" height="20" alt="Ver Detalhes" title="Ver Detalhes"/>
                </Link>
            </td>
        </tr>
        ))}
    </tbody>
    );
}