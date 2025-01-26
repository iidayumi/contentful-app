import client from './contentful';
import { Document } from '@contentful/rich-text-types';

type BlogPost = {
  id: string;
  title: string;
  shortDescription: string;
  content: Document; // リッチテキストの型
};

export const fetchPosts = async (): Promise<BlogPost[]> => {
    // pageBlogPost コンテンツタイプのエントリだけを取得
  const entries = await client.getEntries({ content_type: 'pageBlogPost' }); // Contentful API にアクセスするための クライアントインスタンス 
// client.getEntries() の結果　　配列の各エントリ（entry）を BlogPost 型に変換
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    title: entry.fields.title as string, // as stringはデータが必ずあると仮定
    shortDescription: entry.fields.shortDescription as string,
    content: entry.fields.content as Document, // リッチテキスト型を使用
  }));
};