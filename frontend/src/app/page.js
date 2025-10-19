import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h1>Bem-vindo ao Conecta Escola!</h1>
        <h3 className={styles.subtitle}>Uma plataforma de comunicação entre os pais, seus filhos e a escola!</h3>
        <h4 className={styles.subtopic}>Escolas</h4>
        <p className={styles.paragraph}>Oferecemos um sistema de gerenciamento dos alunos e professores com métricas de desempenho para que a escola tenha um maior controle da sua comunidade!
          Além disso, somos um caminho direto de contato com os pais para repassar esses resultados obtidos.</p>
        <h4 className={styles.subtopic}>Pais e Responsáveis</h4>
        <p className={styles.paragraph}>Saiba sempre em primeira mão sobre o desempenho acadêmico e a frequência escolar do seu dependente!</p>
        <h4 className={styles.subtopic}>Professores</h4>
        <p className={styles.paragraph}>Obtenha métricas precisas sobre o que o desempenho dos seus alunos diz sobre você!</p>
        <br></br>
        <Link className={styles.button} href="/escola">Cadastre já sua escola!</Link>
      </div>
    </main>
  );
}
