import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import axios from '@/services/axios';
import '@/styles/globals.css';

const publicPaths = ['/login', '/register'];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (publicPaths.includes(router.pathname)) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const validateSession = async () => {
      try {
        await axios.get('/users/me', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [router.pathname]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated && !publicPaths.includes(router.pathname)) {
    return null;
  }

  if (publicPaths.includes(router.pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}