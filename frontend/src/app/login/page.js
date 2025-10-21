'use client';
import { useState } from "react";
import styles from "./page.module.css";

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

    //contato com o backend para autenticar o usuário
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      alert('Erro ao fazer login!');
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
          <a href="">Esqueceu sua senha?</a>
        </form>
      </div>
    </main>
  );
}
