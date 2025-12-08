'use client';

import { alterarNota, getNota } from '@/services/notaService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const idNota = searchParams.get('idNota');
    const [nota, setNota] = useState();

    useEffect(() => {
    (async () => {
        try {
        const notaData = await getNota(idNota);
        setNota(notaData);
        } catch (err) {
        console.error("Erro ao recupear nota:", err);
        setNota([]);
        }
    })();
    }, []);
    
    const [formData, setFormData] = useState({
      valor: nota.valor,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('access_token');
      const resultado = await alterarNota(idNota, formData, token);
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
            <label htmlFor="valor">Nota:</label>
            <input className={styles.field} type="number" id="valor" name="valor" placeholder="6.0" value={formData.valor} onChange={handleChange} required/>
          </div>
          <button type="submit">Alterar Nota</button>
        </form>
      </div>
    </main>
  );
}