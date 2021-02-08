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
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div>
            <h2>{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
