import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { app } from '.';

const auth = getAuth(app);

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user as User & { accessToken: string };
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user as User & { accessToken: string };
    })
    .catch((error) => {
      throw error;
    });
};
