import { doc, setDoc } from "firebase/firestore";
import { db } from './firebase';



const createUser = (uid, data) => {
  const user = doc(db, "users", uid);
  setDoc(user, data, { merge: true });
}

export {createUser};