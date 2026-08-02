import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import readingTime from 'reading-time';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  tags: string[];
  readingTime: string;
  cover: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
    const { data, content } = matter(raw);
    const { text } = readingTime(content);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      author: data.author ?? 'Growth101',
      authorRole: data.authorRole ?? 'Editorial',
      tags: data.tags ?? [],
      readingTime: text,
      cover: data.cover ?? '',
    } as PostMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const { text } = readingTime(content);
  const processed = remark().use(remarkHtml).processSync(content);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? 'Growth101',
    authorRole: data.authorRole ?? 'Editorial',
    tags: data.tags ?? [],
    readingTime: text,
    cover: data.cover ?? '',
    contentHtml: processed.toString(),
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
