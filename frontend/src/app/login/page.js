'use client';
import { getAluno } from "@/services/alunoService";
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

async function getUsuario(email) {
  const response = await fetch(`http://127.0.0.1:8000/login/usuario/${email}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.status === 200) {
    const user = await response.json();
    sessionStorage.setItem('idUsuario', user.id);
    return user;
  }
}

export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await verificarUsuario(e.target.username.value, e.target.password.value);
    let user;
    let escola;
    if (resp) {
      if (!(e.target.username.value).includes('@')) {
        user = await getAluno(e.target.username.value);
        sessionStorage.setItem('idUsuario', user.cpf);
      } else {
        user = await getUsuario(e.target.username.value);
      }
      escola = user.id_escola;
      sessionStorage.setItem("idEscola", escola);

      if (user.tipo === 'escola') {
        window.location.href = "/escola";
      } else if (user.tipo === 'professor') {
        window.location.href = "/professor";
      } else if (user.tipo === 'aluno') {
        window.location.href = "/aluno";
      } else if (user.tipo === 'responsavel') {
        window.location.href = "/responsavel";
      }
      
    }
  }

  return (
    <main>
      <div className={styles.container}>
        <h1>Seja bem-vindo ao Conecta Escola!</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input className={styles.field} id="username" type="text" placeholder="E-Mail/CPF" required/>
          <input className={styles.field} id="password" type="password" placeholder="Senha" required/>
          <button type="submit">Login</button>
          <a href="/escola">Esqueceu sua senha?</a>
        </form>
      </div>
    </main>
  );
}
