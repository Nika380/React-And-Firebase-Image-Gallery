import { CheckCircleOutline } from '@mui/icons-material';
import { ImageListItem } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import CircularProgressWithLabel from './CircularProgressWithLabel';
import {v4 as uuid} from 'uuid';
import { uploadFileProgress } from '../../../firebase/UploadFileProgress';
import { addDocument } from '../../../firebase/AddDocument';
import {AuthContext} from '../../../context/AuthContext';

function ProgressItem({file}: any) {
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState<null | string>(null);

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const uploadImage = async () => {
            const imageName = uuid() + "." + file.name.split('.').pop();
            try{
                const url = await uploadFileProgress(
                    file,
                    `${currentUser.uid}`,
                    imageName,
                    setProgress
                );
                const galleryDoc = {
                    imageUrl: url,
                    uid: currentUser.uid,
                    email:currentUser.email,
                    name:currentUser?.displayName,
                    picture:currentUser?.photoURL
                }
                await addDocument(`${currentUser.uid}`, galleryDoc)
            } catch (error: any) {
                alert(error.message);
            }
            setImageUrl(null);


        }
        setImageUrl(URL.createObjectURL(file));
        uploadImage();
    }, [file])

  
    return (
    imageUrl  ? 
    <ImageListItem cols={1} rows={1}> 
        <img src={imageUrl} alt="" />
        <Box
        sx={{position:'absolute',
        top:'0', right:'0', bottom:'0', left:'0',
    display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(0,0,0,0.5)'}}
        >
        {progress < 100 ? (<CircularProgressWithLabel value={progress}/>) : (
            <CheckCircleOutline sx={{width:60, height:60, color:'lightgreen'}} />
        )}
            
        </Box>
    </ImageListItem>
    : null
  )
}

export default ProgressItem