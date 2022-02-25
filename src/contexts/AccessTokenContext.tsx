import React, { createContext, useState } from 'react';
import {
  removeUserToken,
  retrieveUserToken,
  storeUserToken,
} from '../libs/userTokenStorage';

export const AccessTokenContext = createContext({
  accessToken: '' as string,
  changeAccessToken: (token: string) => {
    console.log(token);
  },
});

type AccessTokenContextProviderProps = {
  children: React.ReactNode;
};

export const AccessTokenContextProvider = ({
  children,
}: AccessTokenContextProviderProps) => {
  const [token, setToken] = useState<string>(retrieveUserToken('access'));

  const changeAccessToken = (newToken: string) => {
    if (!newToken) removeUserToken('access');
    else storeUserToken('access', newToken);
    setToken(newToken);
  };

  return (
    <AccessTokenContext.Provider
      value={{ accessToken: token, changeAccessToken }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};
