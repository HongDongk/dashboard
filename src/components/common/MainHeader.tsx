import style from './MainHeader.module.css';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link href="/" className={style.title}>
          Dashboard
        </Link>
      </div>
    </header>
  );
}
