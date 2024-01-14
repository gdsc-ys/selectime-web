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

type Document = { id: string } & DocumentData;

export const getDocuments = async <T extends Document>(
  collectionId: string
) => {
  const collectionRef = collection(db, collectionId);
  const collectionSnapshot = await getDocs(collectionRef);

  return collectionSnapshot.docs.map(
    (document) => ({ id: document.id, ...document.data() } as T)
  );
};

export const getDocument = async <T extends Document>(
  collectionId: string,
  documentId: string
) => {
  const documentRef = doc(db, collectionId, documentId);
  const document = await getDoc(documentRef);

  if (!document.exists()) {
    throw new Error("No such document!");
  }

  return { id: document.id, ...document.data() } as T;
};

export const watchDocument = async <T extends Document>(
  collectionId: string,
  documentId: string,
  callback: (data: T) => void
) => {
  const documentRef = doc(db, collectionId, documentId);

  return onSnapshot(documentRef, (document) => {
    if (!document.exists()) {
      throw new Error("No such document!");
    }

    callback({ id: document.id, ...document.data() } as T);
  });
};

export const addDocument = async <T extends DocumentData>(
  collectionId: string,
  data: T
) => {
  const collectionRef = collection(db, collectionId);
  const documentRef = await addDoc(collectionRef, data);

  return documentRef.id;
};

export const updateDocument = async <T extends DocumentData>(
  collectionId: string,
  documentId: string,
  data: UpdateData<T>
) => {
  const documentRef = doc(db, collectionId, documentId);
  await updateDoc(documentRef, data);
};
