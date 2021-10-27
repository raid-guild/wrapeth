import React from 'react';

import { LoaderContextProvider } from './contexts/loaderContext';
import { InjectedProvider } from './contexts/injectedProviderContext';
import { AppContainer } from './components/AppContainer';
import { RGThemeProvider } from '@raidguild/design-system';
import { theme } from './theme';

import { CurrentUserContextProvider } from './contexts/currentUserContext';
import { ContractContextProvider } from './contexts/contractContext';

const App = () => {
  return (
    <RGThemeProvider>
      <LoaderContextProvider>
        <InjectedProvider>
          <CurrentUserContextProvider>
            <ContractContextProvider>
              <AppContainer />
            </ContractContextProvider>
          </CurrentUserContextProvider>
        </InjectedProvider>
      </LoaderContextProvider>
    </RGThemeProvider>
  );
};

export default App;
