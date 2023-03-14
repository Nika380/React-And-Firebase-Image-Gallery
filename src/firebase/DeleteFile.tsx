import { deleteObject, ref } from 'firebase/storage'
import { storage } from './firebase'

const DeleteFile = (filePath: any) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
}

export default DeleteFile