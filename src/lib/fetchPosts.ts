import client from './contentful';

export const fetchPosts = async () => {
  const entries = await client.getEntries({ content_type: 'pageBlogPost' }); // IDは適切に設定
  return entries.items.map((entry: any) => ({
    id: entry.sys.id,
    title: entry.fields.title,
    shortDescription: entry.fields.shortDescription,
    content: entry.fields.content, // リッチテキストをそのまま取得
  }));
};
