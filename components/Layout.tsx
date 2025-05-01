import { useEffect, useState, ReactNode, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import { LayoutProps } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { UserContext } from '../context/usercontext/index';

export default function Layout({ children }: LayoutProps) {
  const [userName, setUserName] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsClient(true);

    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="NextBlog" width={90} height={50} />
        </div>
        <nav className={styles.navbar}>
          <Link href="/">Home</Link>
          <Link href="/markdown">Mark Down</Link>
          <Link href="/post">Blogs</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          {isClient && userName && <label>Hello - {userName}</label>}
        </nav>
      </header>
      <LanguageSwitcher />
      <main className={styles.main}>{children}</main>
    </>
  );
}

