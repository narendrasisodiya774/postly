import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import styles from '../../styles/About.module.css';

export default function About() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <section className={styles.container}>
        <h1 className={styles.heading}>{t('about_title')}</h1>

        <p className={styles.description}>{t('about_description')}</p>

        <section className={styles.section}>
          <h2>{t('project_goal_title')}</h2>
          <p>{t('project_goal_description')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('features_title')}</h2>
          <ul className={styles.skillsList}>
            <li>{t('feature_1')}</li>
            <li>{t('feature_2')}</li>
            <li>{t('feature_3')}</li>
            <li>{t('feature_4')}</li>
            <li>{t('feature_5')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('tech_stack_title')}</h2>
          <p>{t('tech_stack_description')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('inspiration_title')}</h2>
          <ul>
            <li><a href="https://vercel.com/blog" target="_blank">Vercel Blog</a></li>
            <li><a href="https://leerob.io/blog" target="_blank">Lee Robinson</a></li>
            <li><a href="https://css-tricks.com/" target="_blank">CSS-Tricks</a></li>
            <li><a href="https://dev.to/" target="_blank">Dev.to</a></li>
          </ul>
        </section>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

