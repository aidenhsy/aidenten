import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import ReactMarkdown from 'react-markdown';
import { getPost } from '../../graphql/queries';

export default function Post() {
  const router = useRouter();
  const [post, setPost] = useState({});
  useEffect(() => {
    if (router.query.id) {
      fetchPost();
    }
  }, [router]);
  async function fetchPost() {
    const id = router.query.id;
    const postData = await API.graphql({
      query: getPost,
      variables: { id },
    });
    setPost(postData.data.getPost);
  }
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">
        {post.title}
      </h1>
      <div className="mt-8">
        <ReactMarkdown className="prose" children={post.content} />
      </div>
    </div>
  );
}
