import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import i18nextConfig from '../next-i18next.config';
import useRouteGuard from '@/lib/utils';
import { use } from 'react';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], i18nextConfig)),
    },
  };
};


const Home = () => {
  useRouteGuard();
  const { t } = useTranslation('common');

  return (
    <Layout>
      <section className={styles.hero}>
        <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
        <div className={styles.buttons}>
          <Link href="/about" className={styles.button}>
            {t('learn_more')}
          </Link>
          <Link href="/contact" className={styles.button}>
            {t('contact')}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
