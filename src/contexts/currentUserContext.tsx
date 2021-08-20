import React, { createContext, useContext, useEffect, useState } from 'react';
import { Network, User } from '../types';
import { useInjectedProvider } from './injectedProviderContext';

type CurrentUserContextType = {
  currentUser?: User;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (user: User) => void;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: undefined,
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (user: User) => {},
});

interface CurrentUserProps {
  children: any;
}

export const CurrentUserContextProvider: React.FC<CurrentUserProps> = ({
  children,
}: CurrentUserProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const { injectedChain, address, injectedProvider } = useInjectedProvider();

  useEffect(() => {
    const user: User = createWeb3User(address, injectedChain);

    setCurrentUser(user);
  }, [injectedProvider, injectedChain, address]);

  const createWeb3User = (
    accountAddress: string | '',
    network: Network,
  ): User => {
    return {
      type: 'web3',
      attributes: { 'custom:account_address': accountAddress },
      network: network,
      username: accountAddress,
      ethBalance: '',
      wethBalance: '',
    };
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return { currentUser, setCurrentUser };
};
