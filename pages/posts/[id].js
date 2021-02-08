import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { getPost } from '../../graphql/queries';

export default function Post() {
  const router = useRouter();
  console.log(router.query.id);
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
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
