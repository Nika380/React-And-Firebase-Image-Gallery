import {  collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from './firebase';


function useFirestore(collectionName = `gallery`) {
  const [documents, setDocuments] = useState<any>([]);
  
  useEffect(() => {
    const q = query(
        collection(db, collectionName),
        orderBy('timestamp', 'desc')
    )
    
    const unsub = onSnapshot(q,
         (snapshot) => {
        const docs: { id: string; data: DocumentData; }[] = [];
        snapshot.forEach(doc => {
            docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
        

    },
     (error) => {});

    return () => unsub();

  }, [collection]);
  return { documents };
}

export default useFirestore;
