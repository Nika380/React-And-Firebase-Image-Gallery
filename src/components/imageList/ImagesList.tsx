import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import useFirestore from '../../firebase/useFirestore';
import Options from './Options';
import { AuthContext } from '../../context/AuthContext';
import {useContext} from 'react';
import { useMediaQuery } from '@mui/material';



function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {

  const isSmallScreen = useMediaQuery("(max-width: 480px)" )
  const rowHeight = isSmallScreen ? 50 : 200
  const columns = isSmallScreen ? 2 : 8;
  const pattern = isSmallScreen ? smallPattern : bigPattern;
  
  const {currentUser} = useContext(AuthContext);
  
  const {documents} = useFirestore(`${currentUser.uid}`);
  return (
    <SimpleReactLightbox>
    <SRLWrapper>
          <ImageList
        variant="quilted"
        cols={columns}
        rowHeight={rowHeight}
      
      >
        
        {documents.map((item: {
          imageUrl: any;
  data: any; id: React.Key | null | undefined; img: string; title: string | undefined; 
}, index: number) => {
  return (
    <ImageListItem key={item?.id} cols={pattern[index - Math.floor(index/pattern.length) * pattern.length].cols}
      rows={pattern[index - Math.floor(index/pattern.length) * pattern.length].rows}
      sx={{
        opacity:'0.8',
        transition:'opacity .3s linear',
        cursor:'pointer',
        '&:hover': {opacity: '1'}
      }}
      >
        <Options imageId={item.id} imageURL={item?.data?.imageUrl}/>
      <img
        {...srcset(item?.data?.imageUrl, 200,
           pattern[index - Math.floor(index/pattern.length) * pattern.length].rows,
           pattern[index - Math.floor(index/pattern.length) * pattern.length].cols)}
        alt={item.title}
        loading="lazy"
        className='listImage'
      />
    </ImageListItem>
  )
})}


      </ImageList>
      </SRLWrapper>
      </SimpleReactLightbox>
  );
}



const bigPattern = [
  {
    rows: 2,
    cols: 2
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 2
  },
  {
    rows: 1,
    cols: 2
  },
  {
    rows: 2,
    cols: 2
  },
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 1,
    cols: 1
  }
];

const smallPattern = [
  {
    rows: 1,
    cols: 1
  },
  {
    rows: 2,
    cols: 1
  },
  {
    rows: 1,
    cols:1
  },
  {
    rows: 2,
    cols: 1,
  }
]
