import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadForm from './UploadForm';

function Upload({setFiles}: any) {
  const [showForm, setShowForm] = useState(false);
  

  const handleFormOpen = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  }

  return (
    <div className='uploadContainer'>
      <Typography sx={{background:'rgb(253, 245, 245)',
      display:'flex',justifyContent:'center',marginTop:'20px',
      height:'50px', width:'100%', borderRadius:'30px', zIndex:'-3'}}
      className='uploadButton'
      >
        <Button
         sx={{textTransform:"none",width:'100%', height:'50px',fontSize:'18px'}}
         startIcon={<CloudUploadIcon />}
         onClick={handleFormOpen}
         >
          Upload Files
        </Button>
      </Typography>
      {showForm && <UploadForm  setFiles={setFiles} handleCloseForm={handleCloseForm} />}
    </div>
  )
}

export default Upload
