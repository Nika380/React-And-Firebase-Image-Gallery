import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Delete, MoreVert } from '@mui/icons-material';
import DeleteDocument from '../../firebase/DeleteDocument';
import DeleteFile from '../../firebase/DeleteFile';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useMediaQuery } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Options({imageId, imageURL} : any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {currentUser} = useContext(AuthContext);

  const handleDelete = async () => {
        try {
            await DeleteDocument(`${currentUser.uid}`, imageId);
            await DeleteFile(`${currentUser.uid}/${imageId}`);
        } catch(error) {
            
        }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(imageURL);
      const data = await response.blob();
      const blob = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = blob;
      link.download = imageId;
      link.click();
      URL.revokeObjectURL(blob);
      link.remove();
    } catch (error) {
      console.log(error);
    }
  }

  const isSmallScreen = useMediaQuery("(max-width: 480px)" )


  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', zIndex:'101' }}>
        <Tooltip title="Options">
            {isSmallScreen ? (
              <IconButton
              onClick={handleClick}
              sx={{
                  position:'absolute',
                  right: 0,
                  top: '0',
                  color: 'white',
                  background: 'rgba(0,0,0,.3)',
                  width: '25px',
                  height: '25px'
              }}
              
              >
                  <MoreVert fontSize='small'/>
              </IconButton>
            ): (
              <IconButton
            onClick={handleClick}
            sx={{
                position:'absolute',
                right: 0,
                top: '0',
                color: 'white',
                background: 'rgba(0,0,0,.3)',
                
            }}
            
            >
                <MoreVert fontSize='large'/>
            </IconButton>
            )}
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 101,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDelete} >
          <ListItemIcon >
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          Download
        </MenuItem>
      </Menu>
      </div>
  );
}