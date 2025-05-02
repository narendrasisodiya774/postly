import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/api/markDownServices';
import { PostPageProps } from '../../types';
import styles from '../../styles/Markdown.module.css';
import useRouteGuard from '../../lib/utils';

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

const PostList = ({ posts }:PostPageProps) => {
  useRouteGuard();
  return(
  <Layout>
    <div className={styles.container}>
      <h1 className={styles.heading}>All MarkDown Posts</h1>
      <div className={styles.cardGrid}>
        {posts.map((post:any) => (
          <Link key={post.id} href={`/markdown/${post.id}`} className={styles.card}>
            <div className={styles.cardImageWrapper}>
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className={styles.cardImage}
                />
              )}
            </div>
            <div className={styles.cardContent}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className={styles.cardMeta}>
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
              <div className={styles.cardTags}>
                {post.tags?.map((tag:any) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
)};

export default PostList;
