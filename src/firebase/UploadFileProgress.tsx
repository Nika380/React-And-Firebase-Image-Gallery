import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"


export const uploadFileProgress = (file: any, subFolder: any,imageName: any, setProgress: any) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, subFolder + '/' + imageName);
        const upload = uploadBytesResumable(storageRef, file);
        upload.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, (error)=> {
            reject(error);
        }, async () => {
            try {
                const url = await getDownloadURL(storageRef);
                resolve(url);
            } catch (error) {
                reject(error);
            }
        })
    })
}