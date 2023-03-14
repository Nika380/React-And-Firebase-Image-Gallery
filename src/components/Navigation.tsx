import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Lock from '@mui/icons-material/Lock';
import { auth } from '../firebase/firebase';
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleSingOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    })
  } 



  const {currentUser} = useContext(AuthContext);



  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', zIndex:'101' }}>
        {!currentUser ? <Button startIcon={<Lock />} >Login</Button> : (
             <Tooltip title="Account settings">
             <IconButton
               onClick={handleClick}
               size="small"
               sx={{ ml: 2 }}
               aria-controls={open ? 'account-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
             >
               <Avatar sx={{ width: 32, height: 32 }}>
                {currentUser?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase()}
               </Avatar>
             </IconButton>
           </Tooltip>
        )}
       
        <Typography>
          {currentUser?.displayName  || currentUser?.email}
        </Typography>
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
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSingOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
  );
}