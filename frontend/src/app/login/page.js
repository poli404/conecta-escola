import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <div className={styles.container}>
        <h1>Seja bem-vindo ao Conecta Escola!</h1>
        <form className={styles.loginForm}>
          <input className={styles.field} id="user" type="text" placeholder="Usuário"/>
          <input className={styles.field} id="password" type="password" placeholder="Senha"/>
          <button type="submit">Login</button>
          <a href="">Esqueceu sua senha?</a>
        </form>
      </div>
    </main>
  );
}
