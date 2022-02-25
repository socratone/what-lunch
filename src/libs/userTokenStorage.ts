type Key = 'refresh' | 'access';

export const storeUserToken = (key: Key, userToken: string) => {
  localStorage.setItem(key, userToken);
};

export const retrieveUserToken = (key: Key) => {
  return localStorage.getItem(key) || '';
};

export const removeUserToken = (key: Key) => {
  localStorage.removeItem(key);
};
