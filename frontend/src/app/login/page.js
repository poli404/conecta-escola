'use client';
import { useState } from "react";
import styles from "./page.module.css";

async function verificarUsuario(formData) {
  /*const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);*/
  const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData)
  });

  if (response.status === 200) {
    console.log('usuário reconhecido');
    const data = await response.json();
    //sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('idUser', data.id);
  } else {
    alert('Usuário ou senha incorretos!');
  }

}

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      email: e.target.email.value,
      password: e.target.password.value
    });

    await verificarUsuario(formData);
  }

  return (
    <main>
      <div className={styles.container}>
        <h1>Seja bem-vindo ao Conecta Escola!</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input className={styles.field} id="email" type="text" placeholder="E-Mail" required/>
          <input className={styles.field} id="password" type="password" placeholder="Senha" required/>
          <button type="submit">Login</button>
          <a href="/escola">Esqueceu sua senha?</a>
        </form>
      </div>
    </main>
  );
}
