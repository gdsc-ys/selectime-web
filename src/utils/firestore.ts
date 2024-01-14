import { initializeApp } from "firebase/app";
import {
  DocumentData,
  UpdateData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
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
export const getDocuments = async <T extends DocumentData>(
  collectionName: string
) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((doc) => doc.data() as T);
};

export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  documentName: string
) => {
  const documentRef = doc(db, collectionName, documentName);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    throw new Error("No such document!");
  }

  return snapshot.data() as T;
};

export const watchDocument = async <T extends DocumentData>(
  collectionName: string,
  documentName: string,
  callback: (data: T) => void
) => {
  const documentRef = doc(db, collectionName, documentName);

  return onSnapshot(documentRef, (snapshot) => {
    if (!snapshot.exists()) {
      throw new Error("No such document!");
    }

    callback(snapshot.data() as T);
  });
};

export const addDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  const collectionRef = collection(db, collectionName);
  const ref = await addDoc(collectionRef, data);

  return ref.id;
};

export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  documentName: string,
  data: UpdateData<T>
) => {
  const documentRef = doc(db, collectionName, documentName);
  await updateDoc(documentRef, data);
};
