import '../styles/globals.css';
import { useState, useEffect } from 'react';
import '../configureAmplify';
import Link from 'next/link';
import { Auth, Hub } from 'aws-amplify';

function MyApp({ Component, pageProps }) {
  const [signedInUser, setSignedInUser] = useState(false);
  useEffect(() => {
    authListener();
  });
  async function authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return setSignedInUser(true);
        case 'signOut':
          return setSignedInUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (err) {}
  }
  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/">
          <a className="mr-6 cursor-pointer">Home</a>
        </Link>
        <Link href="/profile">
          <a className="mr-6 cursor-pointer">Profile</a>
        </Link>
        {signedInUser && (
          <Link href="/my-posts">
            <a className="mr-6 cursor-pointer">My Posts</a>
          </Link>
        )}
      </nav>
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
