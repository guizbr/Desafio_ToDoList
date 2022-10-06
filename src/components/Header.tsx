import styles from './Header.module.css';

import logoToDo from '../assets/logoToDo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoToDo} alt="logo"></img>
    </header>
  );
}
