import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/SinglePost.module.css';
import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPostById } from '../../lib/api/blogServices';
import { Post, PostProps } from '../../types';

const Posts = ({ post }: PostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading post...</div>;
  }

  return (
    <Layout>
      <article className={styles.post}>
        <h1>{post.title}</h1>
        <Image
          src="/logo.png"
          alt={post.title}
          width={500}
          height={400}
          priority
        />
        <p>{post.body}</p>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: Post = await getPostById(params?.id as string);

  return {
    props: {
      post,
    },
  };
};

export default Posts;
