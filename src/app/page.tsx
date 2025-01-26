import { fetchPosts } from '../lib/fetchPosts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPage = async () => {
  const posts = await fetchPosts();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-black">Blog Posts</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.length === 0 && (
          <p className="text-center text-black">No blog posts available.</p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-2 text-black">{post.title}</h2>
            <p className="text-black mb-4">{post.shortDescription}</p>
            <div className="prose text-black prose-h1:text-black prose-h2:text-black prose-p:text-black">
              {documentToReactComponents(post.content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
