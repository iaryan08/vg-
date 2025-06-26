<<<<<<< HEAD

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-provider';
=======
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1

export const metadata: Metadata = {
  title: 'Veritas',
  description: 'Veritas: A search engine for authentic blogs and articles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
<<<<<<< HEAD
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
=======
        {children}
        <Toaster />
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
      </body>
    </html>
  );
}
