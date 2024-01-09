import { initializeApp } from "firebase/app";
import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

/**
 * Intialization
 */
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
 * Utils
 */
export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
) => {
  const ref = await addDoc(collection(db, collectionName), data);

  return ref.id;
};

export const getDocument = async <T extends DocumentData>(
  collectionName: string
) => {
  const snapshot = await getDocs(collection(db, collectionName));

  return snapshot.docs.map((doc) => doc.data() as T);
};
