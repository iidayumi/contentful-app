import client from './contentful';
import { Document } from '@contentful/rich-text-types';

type BlogPost = {
  id: string;
  title: string;
  shortDescription: string;
  content: Document; // リッチテキストの型
  featuredImage: string; // 画像URLの型
};

// データを取得
export const fetchPosts = async (): Promise<BlogPost[]> => {
    // pageBlogPostというコンテンツタイプのデータ（エントリー）
  const entries = await client.getEntries({ content_type: 'pageBlogPost' }); // Contentful API にアクセスするための クライアントインスタンス 
// client.getEntries() の結果　　配列の各エントリ（entry）を BlogPost 型に変換
  return entries.items.map((entry) => ({
    id: entry.sys.id, // 一意のID
    title: entry.fields.title as string, // コンテンツ（タイトルや説明など）
    shortDescription: entry.fields.shortDescription as string,
    content: entry.fields.content as Document, // リッチテキスト型を使用
    featuredImage: `https:${entry.fields.featuredImage?.fields?.file?.url}`, // 画像URLを取得

  }));
};