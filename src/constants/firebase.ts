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
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  projectId: import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId,
  measurementId: import.meta.env.measurementId
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

export const saveEconomyToFirestore = async (userId: string, coins: any, XP: any) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, { coins, XP }, { merge: true });
};

export const loadEconomyFromFirestore = async (userId: string) => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : null;
};
export const calculateRewards = (
    isWin: boolean,
    difficulty: number,
    numberOfBoards: number,
    boardSize: number
  ) => {
    const baseMultiplier = difficulty * numberOfBoards * boardSize;
    const coinMultiplier=Math.trunc(Math.random()*5)+1;
    const xpMultiplier=Math.trunc(Math.random()*5)+6;
    return {
      coins: isWin ? baseMultiplier * coinMultiplier : 0,
      xp: isWin ? baseMultiplier* xpMultiplier : baseMultiplier 
    };
  };