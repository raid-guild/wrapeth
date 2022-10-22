import React from 'react';
import { RGThemeProvider } from '@raidguild/design-system';

// import { LoaderContextProvider } from '../contexts/loaderContext';
import { Web3Provider } from '../utils/web3';
import '@rainbow-me/rainbowkit/styles.css';

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => (
  <RGThemeProvider>
    {/* <LoaderContextProvider> */}
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
    {/* </LoaderContextProvider> */}
  </RGThemeProvider>
);

export default App;
