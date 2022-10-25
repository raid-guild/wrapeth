import React from 'react';
import { RGThemeProvider } from '@raidguild/design-system';
import { LoaderContextProvider } from 'contexts/loaderContext';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiClient } from 'utils/wagmiClient';
import { chains } from 'utils/chains';
import { WagmiConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => (
  <RGThemeProvider>
    <LoaderContextProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </LoaderContextProvider>
  </RGThemeProvider>
);

export default App;
