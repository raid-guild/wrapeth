import React from 'react';
import ReactDOM from 'react-dom';
import { RGThemeProvider } from '@raidguild/design-system';
import { LoaderContextProvider } from 'contexts/loaderContext';
import { ContractContextProvider } from 'contexts/contractContext';
import App from './App';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiClient } from 'utils/wagmiClient';
import { chains } from 'utils/chains';
import { WagmiConfig } from 'wagmi';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RGThemeProvider>
      <LoaderContextProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <ContractContextProvider>
              <App />
            </ContractContextProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </LoaderContextProvider>
    </RGThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
