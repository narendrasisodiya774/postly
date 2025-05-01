import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import styles from '../../styles/Post.module.css';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getAllPosts } from '../../lib/api/blogServices';
import { Post, PostPageProps } from '../../types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const posts: Post[] = await getAllPosts();
  const limitedPosts = posts.slice(0, 5);

  return {
    props: {
      posts: limitedPosts,
      session,
    },
  };
};

const PostPage = ({ posts }: PostPageProps) => {
  return (
    <Layout>
      <header className={styles.header}>
        <h1>Welcome to NextBlog</h1>
        <p>Your tech journey starts here. Discover insightful blogs, tutorials, and tips.</p>
      </header>

      <section className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2>{post.title}</h2>
            <Image
              src="/logo.png"
              alt={post.title}
              width={200}
              height={200}
              style={{ borderRadius: '8px' }}
            />
            <p>{post.body.substring(0, 100)}...</p>
            <Link href={`/post/${post.id}`}>
              Read more
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default PostPage;
