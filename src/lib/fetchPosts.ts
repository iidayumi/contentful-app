import client from './contentful';
import { Document } from '@contentful/rich-text-types';

// 型チェック
type BlogPost = {
  id: string;
  title: string;
  shortDescription: string;
  content: Document; // リッチテキストの型
  featuredImage: string; // 画像URLの型
};

// データを取得
export const fetchPosts = async (p0?: { skip?: number; limit?: number; order?: string; query?: string }): Promise<BlogPost[]> => {
  // 
const { skip = 0, limit = 100, order = '-sys.updatedAt', query } = p0 || {}; 
  // pageBlogPostというコンテンツタイプのデータ（エントリー）
  const entries = await client.getEntries({
    content_type: 'pageBlogPost',
    // 動的パラメータ　データをとってくるときに取得の条件や順序を指定
    // ドキュメントで説明されているパラメータを実装
    skip, //取得開始位置
    limit,//一度に取得するデータ数
    order,//並び順
    query,//条件の絞り込み
  });

  console.log("🚀 形成前データ", entries);

  // 取得したentries.itemsを必要な形に整える
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
