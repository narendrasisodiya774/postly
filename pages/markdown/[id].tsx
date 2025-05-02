import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { getAllPosts, getPostById } from '../../lib/api/markDownServices';
import { MarkDownDetailProps } from '../../types';
import styles from '../../styles/SingleMarkdown.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<MarkDownDetailProps> = async ({ params }) => {
  const post = await getPostById(params?.id as string);
  return {
    props: {
      post,
    },
  };
};

const PostPage = ({ post }: MarkDownDetailProps) => (
  <Layout>
    <article className={styles.container}>
      {post.coverImage && (
        <div className={styles.coverWrapper}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className={styles.coverImage}
            priority
          />
        </div>
      )}

      <div className={styles.meta}>
        <span className={styles.author}>{post.author}</span>
        <span className={styles.date}>{post.date}</span>
        <span className={styles.readingTime}>{post.readingTime}</span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  </Layout>
);

export default PostPage;
