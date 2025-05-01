import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/api/markDownServices';
import { PostPageProps } from '../../types';
import styles from '../../styles/Markdown.module.css';

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

const PostList = ({ posts }: PostPageProps) => (
  <Layout>
    <div className={styles.container}>
      <h1 className={styles.heading}>All Blog Posts</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <Link href={`/markdown/${post.id}`} className={styles.link}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default PostList;
