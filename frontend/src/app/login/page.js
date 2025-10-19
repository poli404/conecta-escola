import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <div className={styles.container}>
        <p>Seja bem-vindo!</p>
        <form className={styles.loginForm}>
          <input className={styles.field} type="text" placeholder="Usuário"/>
          <input className={styles.field} type="password" placeholder="Senha"/>
          <button type="submit">Login</button>
        </form>
        <a>Esqueceu sua senha?</a>
      </div>
    </main>
  );
}
