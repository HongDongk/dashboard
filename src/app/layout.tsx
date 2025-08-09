import type { Metadata } from 'next';
import './globals.css';
import MainHeader from '@/components/common/MainHeader';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '게시판 과제입니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
