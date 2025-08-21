import Link from 'next/link';

export function Footer() {
  return (
    <footer className='p-12 bg-gradient-to-b from-slate-100 to-slate-300 text-center'>
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href='/' className='hover:underline decoration-1'>
          The Blog
        </Link>
      </p>
    </footer>
  );
}
