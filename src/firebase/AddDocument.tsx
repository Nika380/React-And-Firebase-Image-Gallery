import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"



export const addDocument = (collectionName: string, documentObj: any) => {
    const docRef = doc(collection(db, collectionName));
    return setDoc(docRef, {
        ...documentObj,
        timestamp: serverTimestamp()
    })
}