import { Button, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  Stack } from '@mui/system'
import { useRef, useState } from 'react'

function UploadForm({ setFiles, handleCloseForm }: any) {
    const [fileCount, setFileCount] = useState(0);
    const fileRef = useRef<any>();


    const handleFileInputChange = (event: any) => {
      setFileCount(event.target.files.length);
      setFiles([...event.target.files]);
      fileRef.current.value = null;
    };

    const handleClose = () => {
        const main = document.getElementById("main");
        if(main) {
            main.style.display = "none";
        }
        handleCloseForm();
    }
  
  return (
    <div className='uploadImageMain' id="main">
        <form className='uploadImageForm'>
        <input type="file" multiple className='uploadImageInput' ref={fileRef} id='file' onChange={(e) => handleFileInputChange(e)}/>
        <label htmlFor='file' style={{cursor:'pointer'}} > <CloudUploadIcon sx={{marginRight:'10px'}}/> Select Files To Upload</label>
        <Typography sx={{marginTop:'-120px', color:"rgb(150, 150, 150)"}}>you have uploaded {fileCount} files</Typography>
        <div className='uploadImageButtons'>
        <Stack direction="row" spacing={3}>
         <Button sx={{textTransform:'none',
          color:'grey', border:'none', '&:hover':{border:'none'}}}
          variant= "outlined"
          onClick={handleClose}
         >
            Cancel
         </Button>
        </Stack>
        </div>
        </form>
    </div>
        )
}
export default UploadForm;
