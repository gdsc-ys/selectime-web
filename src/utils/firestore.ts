import { initializeApp } from "firebase/app";
import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});
const db = getFirestore(app);

/**
 * 추가
 */
export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
) => {
  const docRef = await addDoc(collection(db, collectionName), data);

  return docRef.id;
};
