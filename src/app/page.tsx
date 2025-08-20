import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostCoverImage } from '@/components/PostCoverImage';
import { PostHeading } from '@/components/PostHeading';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <PostCoverImage
          alt='Post image'
          href='#'
          src='/images/bryen_9.png'
          width={1200}
          height={720}
          priority={true}
        />

        <div className='flex flex-col gap-4 sm: justify-center'>
          <time
            className='text-slate-600 block text-sm/tight'
            dateTime='2025-08-19'
          >
            19/08/2025 00:00
          </time>

          <PostHeading as='h1' url='#'>
            Lorem ipsum dolor sit amet consectetur
          </PostHeading>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae
            optio facere nobis rerum provident ea. Natus nam debitis commodi
            provident omnis maiores nostrum rem sed, quos dolores consectetur
            nisi dicta!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className='text-center font-bold text-6xl'>Footer</h1>
      </footer>
    </Container>
  );
}
