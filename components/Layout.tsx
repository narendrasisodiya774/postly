import { useEffect, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import { LayoutProps } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { UserContext } from '../context/usercontext/index';

export default function Layout({ children }: LayoutProps) {
  const [userName, setUserName] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    setIsClient(true);
    if (user?.name) {
      setUserName(user.name);
    } else {
      setUserName('');
    }
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="NextBlog" width={90} height={50} />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setNavOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`${styles.navbar} ${navOpen ? styles.navOpen : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/markdown">Mark Down</Link>
          <Link href="/post">Blogs</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>

          <div className={styles.authSection} ref={dropdownRef}>
            {isClient && userName ? (
              <div className={styles.profileDropdown}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className={styles.profileButton}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <Image src="/profile.png" alt="Profile" width={30} height={30} className={styles.imgProfile} />
                </button>
                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <span className={styles.userName}>{userName}</span>
                    <button onClick={logout} className={styles.logoutButton}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <LanguageSwitcher />
      <main className={styles.main}>{children}</main>
    </>
  );
}
