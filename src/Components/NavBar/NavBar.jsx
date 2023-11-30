// import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import logo from '../../assets/LOGO.png'
import { AuthContext } from '../../firebase/authProvider/AuthProviders';
import { MenuItem, Typography } from '@mui/material';
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogOut = () => {
        logOut()
    }
    const [anchorElUser, setAnchorElUser] = useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
        {
            user?.email ? <>
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
        </> : ''
        }
        <NavLink to={'/contactus'}>
            <Button className='navlink' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}>
                Contact Us
            </Button>
        </NavLink>
    </>
    return (
        <div >
            <AppBar sx={{ background: '#fff', color: 'black' }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box className="hidden md:block" sx={{ mr: '30px' }}>
                            <img className='w-16' src={logo} alt="" />
                        </Box>


                        <Box className="block md:hidden" sx={{ mr: '30px' }}>
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
                                className="block md:hidden navactive"
                            >
                                {navli}
                            </Menu>
                        </Box>

                        <Box className="block md:hidden" sx={{ mr: 'auto' }}>
                            <img className='w-16' src={logo} alt="" />
                        </Box>
                        <Box className="hidden md:flex navactive" sx={{ flexGrow: 1, gap: '10px' }}>

                            {navli}

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            {
                                !user ? <Link to={'/login'}>
                                    <Button className='login' variant="contained" sx={{ background: '#36a3c1', color: 'white', fontWeight: 'bold', padding: '10px', mx: '10px', px: '20px' }}>Login</Button>
                                </Link> :
                                    <>

                                        <Tooltip title="Open settings">
                                            <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                                <Avatar alt="Remy Sharp" src={user?.photoURL} />
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

                                            <MenuItem sx={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'start', alignItems: 'start' }} onClick={handleCloseUserMenu}>
                                                <Typography onClick={handleLogOut} >Log Out</Typography>


                                            </MenuItem>
                                            <MenuItem sx={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'start', alignItems: 'start' }} onClick={handleCloseUserMenu}>
                                                <Link to={'/dashboard'}>

                                                    <Typography >DashBoard</Typography>
                                                </Link>


                                            </MenuItem>


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