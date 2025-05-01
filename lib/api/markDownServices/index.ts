
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostMarkdownProps } from '../../../types';

const postsDir = path.join(process.cwd(), 'posts');

export function getAllPosts(): PostMarkdownProps[] {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      if (!data.id || !data.title || !data.date) return null;

      return {
        id: data.id,
        title: data.title,
        date: data.date,
        contentHtml: '',
      };
    })
    .filter(Boolean) as PostMarkdownProps[];
}

export async function getPostById(id: string): Promise<PostMarkdownProps> {
  const filePath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const contentHtml = (await remark().use(html).process(content)).toString();

  return {
    id: data.id,
    title: data.title,
    date: data.date,
    contentHtml,
  };
}
