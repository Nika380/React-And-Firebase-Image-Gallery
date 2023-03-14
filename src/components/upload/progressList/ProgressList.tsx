import { ImageList } from '@mui/material'
import ProgressItem from './ProgressItem'

function ProgressList({files}: any) {
  return (
    <ImageList rowHeight={80} cols={4}>
        {files.map((file: any) => {
          return <ProgressItem file ={file}/>
        })}
        
        
    </ImageList>
  )
}

export default ProgressList