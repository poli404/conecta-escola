import Image from "next/image";
import styles from "./tabelaExterna.module.css";
import lupa from "../../../public/search_icon.svg";

//const disciplinas = getAllDisicplinas();
const disciplinas = [{id: 3, nome: "Física II"}];

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

export const CorpoTabela = ({ dados, tipo }) => {
    if (tipo == 'notas'){
        return(
            <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{
                    disciplinas.find((e) => e.id === dado.idDisciplina).nome
                }</td>
                <td className={styles.center}>{dado.data}</td>
                <td className={styles.center}>{dado.nota}</td>
            </tr>
            ))}
        </tbody>
        );
    } else if (tipo == 'faltas'){
        return(
            <tbody>
            {dados.map((dado) => (
            <tr key={dado.id}>
                <td className={styles.center}>{
                    disciplinas.find((e) => e.id === dado.idDisciplina).nome
                }</td>
                <td className={styles.center}>{dado.data}</td>
            </tr>
            ))}
            <tr>
                <td colspan="2"><b className={styles.title}>Total de Faltas:</b> {dados.length}</td>
            </tr>
        </tbody>
        );
    }
    
}