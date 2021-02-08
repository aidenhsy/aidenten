import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    setPosts(postData.data.listPosts.items);
  }
  return (
    <div>
      <Head>
        <title>Aiden's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-8">Posts</h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div className="my-6 pb-6 border-b border-gray-300">
            <div className="cursor-pointer mt-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
