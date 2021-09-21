import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from './firebase';



const createUser = (uid, data) => {
  const user = doc(db, "users", uid);
  setDoc(user, data, { merge: true });
}

const createSite = async (data) => {
  const docRef = await addDoc(collection(db, "sites"), data);
  return docRef.id;
}

export {createUser,createSite};