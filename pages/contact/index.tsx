import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import styles from '../../styles/Contact.module.css';

export default function Contact() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <section className={styles.container}>
        <h1 className={styles.heading}>{t('contact_title')}</h1>
        <p className={styles.description}>{t('contact_description')}</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">{t('contact_name')}</label>
            <input type="text" id="name" name="name" placeholder={t('contact_name_placeholder')} />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">{t('contact_email')}</label>
            <input type="email" id="email" name="email" placeholder={t('contact_email_placeholder')} />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">{t('contact_message')}</label>
            <textarea id="message" name="message" rows={5} placeholder={t('contact_message_placeholder')}></textarea>
          </div>

          <button type="submit" className={styles.button}>{t('contact_submit')}</button>
        </form>
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
