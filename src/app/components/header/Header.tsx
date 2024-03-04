import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>Todo App</h1>
      <Link href="/add">
        <button className={styles.addButton}> + Add Todo</button>
      </Link>
    </div>
  );
}

export default Header;
