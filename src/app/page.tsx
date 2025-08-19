import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostHeading } from '@/components/PostHeading';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link className='w-full h-full overflow-hidden rounded-xl' href='#'>
          <Image
            className='w-full h-full object-cover object-center group-hover:scale-105 transition'
            src='/images/bryen_0.png'
            alt='Post image'
            width={1200}
            height={720}
            priority
          />
        </Link>
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
