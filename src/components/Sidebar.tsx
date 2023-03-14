import { Box } from '@mui/material'
import { useState } from 'react';
import Navigation from './Navigation'
import ProgressList from './upload/progressList/ProgressList'
import Upload from './upload/Upload'

function Sidebar() {
  const [files, setFiles] = useState([]);
  return (
    <Box className='sidebar' sx={{}}>
      <Navigation />
      <Upload setFiles={setFiles}/>
      <div className='progressListInSidebar'>
        <ProgressList files={files} />
      </div>
    </Box>          
      )
}

export default Sidebar