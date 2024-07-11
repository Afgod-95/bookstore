import React, { useState } from 'react';
import { IoHomeOutline, IoSettingsOutline, IoSearch, IoCreateOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { RiMenu2Line } from "react-icons/ri";
import './Sidebar.css';
import { useMediaQuery } from 'react-responsive';
import { bgColor } from '../constants/Colors'; 
import { MdOutlineViewQuilt } from "react-icons/md";
import UserProfile from '../components/UserProfile';
import BottomSheet from '../components/BottomSheet';

const Sidebar = ({ children }) => {
    const links = [
        {
            id: 0,
            name: 'Home',
            path: '/dashboard',
            icon: <IoHomeOutline className='icons'/>
        },
        {
            id: 1,
            name: 'Discover',
            path: '/discover',
            icon: <IoSearch className='icons'/>
        },
        {
            id: 2,
            name: 'Manage',
            path: '/manage',
            icon: <IoCreateOutline className='icons' />
        },
        {
            id: 3,
            name: 'Settings',
            path: '/settings',
            icon: <IoSettingsOutline className='icons' />
        }
    ];

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleBottomSheet = () => {
        setBottomSheetOpen(true);
    }

    const DrawerList = (
        <List>
            {links.map((item) => (
                <ListItem key={item.id} disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to={item.path}
                        onClick={() => setDrawerOpen(false)}
                        sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        activeClassName="active"
                        
                    >
                        <ListItemIcon sx={{color: 'white'}}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <div className="container">
            <div className="sidebar-container">
                <div className="side-bar">
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={toggleDrawer}
                            >
                                <RiMenu2Line style={{color: '#fff', fontSize: '2rem', marginTop: '1.5rem', marginLeft: '-8px'}}/>
                            </IconButton>

                            <IconButton
                                color="inherit"
                                onClick={toggleBottomSheet}
                            >
                                <MdOutlineViewQuilt style={{color: '#fff', fontSize: '2rem', marginTop: '1.5rem', marginLeft: '-8px'}}/>
                            </IconButton>
                        </>
                        
                    ) : (
                        <>
                            <h3>Book Store</h3>
                            <div className="link">
                                {links.map((item, index) => (
                                    <NavLink to={item.path} key={index} className="links" activeclassname="active">
                                        <div className="icons">{item.icon}</div>
                                        <p className="text">{item.name}</p>
                                    </NavLink>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '250px', 
                        backgroundColor: bgColor, 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '30px'
                    },
                }}
            >
                <div className="drawer-content">
                    <h3 >Book Store</h3>
                    {DrawerList}
                </div>
            </Drawer>

            

            <div className="content">
                {children}
            </div>
        </div>

        {isMobile && bottomSheetOpen && (
            <BottomSheet 
                onClose={() => setBottomSheetOpen(false)} 
                isOpen = {bottomSheetOpen}
            >
                <UserProfile />
            </BottomSheet>
        )}
        
        </>
        
    );
};

export default Sidebar;
