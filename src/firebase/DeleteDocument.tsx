import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

const DeleteDocument = (collectionName: any, documentId: any) => {
  return deleteDoc(doc(db, collectionName, documentId));
}

export default DeleteDocument