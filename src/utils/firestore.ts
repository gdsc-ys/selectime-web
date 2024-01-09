import { initializeApp } from "firebase/app";
import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import config from "firebase-config.json";

const app = initializeApp(config);
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
