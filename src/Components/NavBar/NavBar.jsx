// import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import logo from '../../assets/LOGO.png'
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const show = true
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navli = <>
        <NavLink to={'/'}>
            <Button className='navlink' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}>
                Home
            </Button>
        </NavLink>
        <NavLink to={'/availablecamps'}>
            <Button className='navlink' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}>
                Available Camps
            </Button>
        </NavLink>
        <NavLink to={'/dashboard'}>
            <Button className='navlink' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}>
                Dashboard
            </Button>
        </NavLink>
        <NavLink to={'/contactus'}>
            <Button className='navlink' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}>
                Contact Us
            </Button>
        </NavLink>
    </>
    return (
        <div >
            <AppBar sx={{ background: '#ffffff63', color: 'black' }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Box className="hidden md:block" sx={{ mr: '30px'}}>
                            <img className='w-16' src={logo} alt="" />
                        </Box>
                        

                        <Box className="block md:hidden" sx={{   mr: '30px' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                className="block md:hidden"
                            >
                                {navli}
                            </Menu>
                        </Box>

                        <Box className="block md:hidden" sx={{ mr: 'auto'}}>
                            <img className='w-16' src={logo} alt="" />
                        </Box>
                        <Box className="hidden md:flex" sx={{ flexGrow: 1,  gap: '10px' }}>

                            {navli}

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            {
                                show ? <Button className='login' variant="contained" sx={{ background: '#36a3c1', color: 'white', fontWeight: 'bold', padding: '10px', mx: '10px', px: '20px' }}>Login</Button> :
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">{setting}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                            }


                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default NavBar;