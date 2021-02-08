import '../styles/globals.css';
import '../configureAmplify';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
