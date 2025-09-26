import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { ToastifyContainer } from '@/components/ToastifyContainer';

export const metadata: Metadata = {
  title: {
    default: 'The Blog',
    template: '%s | The Blog',
  },
  description:
    'Um blog sobre assuntos variados, focado em tecnologia e desenvolvimento de software.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />
          {children}
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
