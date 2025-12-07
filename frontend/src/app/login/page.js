'use client';
import styles from "./page.module.css";
import { getEscola } from "@/services/escolaService";

async function verificarUsuario(email, password) {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  const response = await fetch('http://127.0.0.1:8000/login', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
  });

  if (response.status === 200) {
    console.log('usuário reconhecido');
    const token = await response.json();
    sessionStorage.setItem('access_token', token.access_token);
    return true;
  } else {
    alert('Usuário ou senha incorretos!');
    return false;
  }

}

export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await verificarUsuario(e.target.username.value, e.target.password.value);
    if (resp) {
      const dominio = e.target.username.value.substring(e.target.username.value.indexOf('@')+1).split('.br')[0];
      const escola = 1 //await getEscola(dominio);

      sessionStorage.setItem("idEscola", escola);

      window.location.href = "/escola";
    }
  }

  return (
    <main>
      <div className={styles.container}>
        <h1>Seja bem-vindo ao Conecta Escola!</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input className={styles.field} id="username" type="email" placeholder="E-Mail" required/>
          <input className={styles.field} id="password" type="password" placeholder="Senha" required/>
          <button type="submit">Login</button>
          <a href="/escola">Esqueceu sua senha?</a>
        </form>
      </div>
    </main>
  );
}
