'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getNota } from '@/services/alunoServiceService';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const searchParams = useSearchParams();
    const idNota = searchParams.get('idNota');    
      data: nota.data
    };

    useEffect(() => {
    (async () => {
        try {

        const nota = await getNota(idNota);
        setNota(notaData);
        } catch (err) {
        console.error("Erro ao alterar nota:", err);
        setNota([]);
        }
    })();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        const token = sessionStorage.getItem('access_token');
      const idNota = sessionStorage.getItem('idNota');
      formData.idNota = idNota;
      const resultado = await alterarNota(formData, token);
      alert(`Senha alterada com sucesso!`);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

  return (
    <main>
      <MenuEscola/>
        <div className={styles.container}>
        <h1>Alterar Nota</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="data">Data:</label>
            <input className={styles.field} type="date" id="data" name="data" value={formData.data} onChange={handleChange} required/>  
            <label htmlFor="valor">Nota:</label>
            <input className={styles.field} type="number" id="valor" name="valor" placeholder="6.0" value={formData.valor} onChange={handleChange} required/>
          </div>
          <button type="submit">Alterar Nota</button>
        </form>
      </div>
    </main>
  );

