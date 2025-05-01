import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getAllPosts, getPostById } from '../../lib/api/markDownServices';
import { MarkDownDetailProps } from '../../types';
import styles from '../../styles/SingleMarkdown.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{post.date}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  </Layout>
);

export default PostPage;
