import React from 'react';
import ReactDOM from 'react-dom';
import { RGThemeProvider } from '@raidguild/design-system';
import { LoaderContextProvider } from 'contexts/loaderContext';
import { InjectedProvider } from 'contexts/injectedProviderContext';
import { CurrentUserContextProvider } from 'contexts/currentUserContext';
import { ContractContextProvider } from 'contexts/contractContext';
import App from './App';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import client from 'utils/wagmiClient';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RGThemeProvider>
      <LoaderContextProvider>
        <InjectedProvider>
          <CurrentUserContextProvider>
            <ContractContextProvider>
              <WagmiConfig client={client}>
                {/* <RainbowKitProvider chains={chains}> */}
                <App />
                {/* </RainbowKitProvider> */}
              </WagmiConfig>
            </ContractContextProvider>
          </CurrentUserContextProvider>
        </InjectedProvider>
      </LoaderContextProvider>
    </RGThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
