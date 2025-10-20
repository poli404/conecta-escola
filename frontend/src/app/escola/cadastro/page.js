import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h1>Cadastro de Nova Escola</h1>
        <form className={styles.forms}>
          <div>
            <label htmlFor="nome">Nome da Escola:</label>
            <input className={styles.field} type="text" id="nome" name="nome" required/>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" required/>
            <label htmlFor="email">E-Mail:</label>
            <input className={styles.field} type="email" id="email" name="email" placeholder="escola@escola.com" required/>
            <label htmlFor="cnpj">CNPJ:</label>
            <input className={styles.field} type="text" id="cnpj" name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" required/>
            <label htmlFor="dominio">Domínio de E-Mail:</label>
            <input className={styles.field} type="text" id="dominio" name="dominio" placeholder="@nomeDaEscola.com" required/>
          </div>
          <button type="submit">Cadastrar Escola</button>
        </form>
      </div>
    </main>
  );
}
