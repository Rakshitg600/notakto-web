import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBmSkCnePbHTi2BcngOIVekwP7CxJJ0SzQ",
  authDomain: "notakto-g600.firebaseapp.com",
  projectId: "notakto-g600",
  storageBucket: "notakto-g600.firebasestorage.app",
  messagingSenderId: "200189691429",
  appId: "1:200189691429:web:14bcecc90423f59e0ce1cc",
  measurementId: "G-P2EXC36LGK",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const onAuthStateChangedListener = (callback: any) => {
  return onAuthStateChanged(auth, callback);
};

export const saveEconomyToFirestore = async (userId: string, coins: any, experience: any) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, { coins, experience }, { merge: true });
};

export const loadEconomyFromFirestore = async (userId: string) => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : { coins: 1000, experience: 0 };
};
export const calculateRewards = (
  isWin: boolean,
  difficulty: number,
  numberOfBoards: number,
  boardSize: number
) => {
  const baseMultiplier = difficulty * numberOfBoards * boardSize;
  const coinMultiplier = Math.trunc(Math.random() * 5) + 1;
  const xpMultiplier = Math.trunc(Math.random() * 5) + 6;
  return {
    coins: isWin ? baseMultiplier * coinMultiplier : 0,
    xp: isWin ? baseMultiplier * xpMultiplier : baseMultiplier
  };
};