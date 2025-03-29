import { wagmiConfig } from '@/utils/wagmiConfig';
import '../styles/globals.css';
import React from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';
import { WagmiProvider } from 'wagmi';
import { Toaster } from '@/components/ui/sonner';

interface AppProps {
  Component: any;
  pageProps: any;
}

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Wrap ETH</title>
      <meta
        name='WrapETH'
        content='Easily wrap ETH or xDAI for trading with any ERC-20 token. No fees, no frills.'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    <Toaster />
    <Analytics />
  </>
);

export default App;
