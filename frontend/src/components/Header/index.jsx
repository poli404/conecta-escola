import styles from './header.module.css';
import logo from '../../../public/logo_branca.png';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className={styles.header}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="Logo do Conecta Escola"/>
        </Link>
        <h2>Conecta Escola</h2>
    </div>
    );
}