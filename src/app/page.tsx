import { Container } from '@/components/Container';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <header>
        <h1 className='text-center font-bold text-6xl'>Header</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className='text-center font-bold text-6xl'>Footer</h1>
      </footer>
    </Container>
  );
}
