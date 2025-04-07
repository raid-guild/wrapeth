import Provider from '@/app/providers';
import cn from '@/lib/utils';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/next';
import { Metadata, Viewport } from 'next';
// eslint-disable-next-line camelcase
import { Texturina, Uncial_Antiqua } from 'next/font/google';
import React from 'react';

const uncial = Uncial_Antiqua({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

const texturina = Texturina({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Wrap ETH',
  description:
    'Easily wrap ETH or xDAI for trading with any ERC-20 token. No fees, no frills.',
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body
      className={cn(
        'bg-background h-screen w-screen max-w-full overflow-auto',
        uncial.className,
        texturina.className
      )}
    >
      <Provider>
        <main>{children}</main>
      </Provider>
      <Analytics mode='production' />
    </body>
  </html>
);

export default RootLayout;
