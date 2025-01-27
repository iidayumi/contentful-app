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
export const fetchPosts = async (p0?: { skip?: number; limit?: number; order?: string; query?: string }): Promise<BlogPost[]> => {
const { skip = 0, limit = 100, order = '-sys.updatedAt', query } = p0 || {};

  // pageBlogPostというコンテンツタイプのデータ（エントリー）
  const entries = await client.getEntries({
    content_type: 'pageBlogPost',
    skip,
    limit,
    order,
    query,
  });

  console.log("🚀 形成前データ", entries);

  // 整形したデータを生成
  const formattedEntries = entries.items.map((entry) => ({
    id: entry.sys.id, // 一意のID
    title: entry.fields.title as string, // コンテンツ（タイトルや説明など）
    shortDescription: entry.fields.shortDescription as string,
    content: entry.fields.content as Document, // リッチテキスト型を使用
    featuredImage: `https:${entry.fields.featuredImage?.fields?.file?.url}`, // 画像URLを取得
  }));

  console.log('形成後データ', formattedEntries);

  // 形成後のデータを返す
  return formattedEntries;
};
