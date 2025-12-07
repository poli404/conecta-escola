'use client';
import { useState } from "react";
import styles from "./page.module.css";
import { getEscola } from "@/services/escolaService";

async function verificarUsuario(formData) {
  const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData)
  });

  if (response.status === 200) {
    console.log('usuário reconhecido');
    return true;
  } else {
    alert('Usuário ou senha incorretos!');
    return false;
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

    const resp = await verificarUsuario(formData);
    if (resp) {
      const dominio = formData.email.substring(formData.email.indexOf('@')+1).split('.br')[0];
      console.log(dominio);
      const escola = await getEscola(dominio);

      sessionStorage.setItem("idEscola", escola.id);
    }
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
