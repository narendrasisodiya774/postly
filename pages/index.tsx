import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { getAllPosts } from '../lib/api/markDownServices';
import { PostMarkdownProps } from '../types';
import i18nextConfig from '../next-i18next.config';

interface HomeProps {
  posts: PostMarkdownProps[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const allPosts = getAllPosts().slice(0, 3); // Show only 4 latest posts
  return {
    props: {
      posts: allPosts,
      ...(await serverSideTranslations(locale ?? 'en', ['common'], i18nextConfig)),
    },
  };
};

const Home = ({ posts }: HomeProps) => {
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
          <Link href="/contact" className={styles.buttonOutline}>
            {t('contact')}
          </Link>
        </div>
      </section>

      <section className={styles.latestPosts}>
        <h2>{t('latest_blogs')}</h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.id} href={`/markdown/${post.id}`} className={styles.card}>
              <div className={styles.cover} style={{ backgroundImage: `url(${post.coverImage})` }} />
              <div className={styles.content}>
                <h3>{post.title}</h3>
                <p className={styles.meta}>
                  {post.date} • {post.readingTime}
                </p>
                <p className={styles.description}>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.centered}>
          <Link href="/markdown" className={styles.buttonSecondary}>
            {t('view_all_blogs')}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
