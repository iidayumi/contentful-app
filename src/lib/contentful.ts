import { createClient } from 'contentful';

// ContentfulのAPIに接続するためのクライアントインスタンスを作成
const client = createClient({
  // スペースID
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  // アクセストークン
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
});

export default client;
