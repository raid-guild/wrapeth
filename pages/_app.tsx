import React from 'react';
import Head from 'next/head';
import {
  defaultTheme,
  ChakraProvider,
  Fonts,
  ColorModeScript,
} from '@raidguild/design-system';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { wagmiClient } from 'utils/wagmiClient';
import { chains } from 'utils/chains';
import { WagmiConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

interface AppProps {
  Component: any;
  pageProps: any;
}

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
    <ChakraProvider theme={defaultTheme} resetCSS>
      <ColorModeScript initialColorMode='dark' />
      <Fonts />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </>
);

export default App;
