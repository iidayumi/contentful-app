import { fetchPosts } from '../lib/fetchPosts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPage = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 && <p>No blog posts available.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.shortDescription}</p>
          {/* リッチテキストをレンダリング */}
          <div>{documentToReactComponents(post.content)}</div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
