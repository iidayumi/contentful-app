import client from './contentful';
import { Document } from '@contentful/rich-text-types';

type BlogPost = {
  id: string;
  title: string;
  shortDescription: string;
  content: Document; // リッチテキストの型
};

export const fetchPosts = async (): Promise<BlogPost[]> => {
  const entries = await client.getEntries({ content_type: 'pageBlogPost' }); // 適切なIDを設定
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    title: entry.fields.title as string,
    shortDescription: entry.fields.shortDescription as string,
    content: entry.fields.content as Document, // リッチテキスト型を使用
  }));
};