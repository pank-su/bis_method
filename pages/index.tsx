import {
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {AppBar, Drawer, DrawerHeader} from "../src/Utils"
import CssBaseline from '@mui/material/CssBaseline';
//import fs from "fs";
import Box from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import theme from "../src/theme";
import {PureComponent, useEffect, useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavEl from "../src/NavEl";
import Frame from 'react-frame-component';


const navs = [new NavEl("Теория", <InfoOutlinedIcon/>, <><Info/></>),
    new NavEl("Теория 2", <InfoOutlinedIcon/>, <>BLa-bla 2</>)]


function Info() {

    // const fileContents = fs.readFileSync('../src/infoPresentation/index.html', 'utf8');
    const [data, setData] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/hello')
            .then((res) => res!.body)
            .then((data) => {
                setData(data?.getReader().read()[Symbol.toStringTag]!)
                setLoading(false)
            })
    }, [])

    return <><div dangerouslySetInnerHTML={{__html: data}}></div></>
}

export default function Index() {

    const [open, setOpen] = useState(false);
    const [selectedNav, setSelectedN] = useState(navs[0])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const setSelectedNav = (el: NavEl) => setSelectedN(el)


    return <>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Схема горнера
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {navs.map((value) => (<ListItemButton onClick={(event) => {
                        setSelectedNav(value)
                    }} key={value.name.toString()}
                                                          sx={{
                                                              minHeight: 48,
                                                              justifyContent: open ? 'initial' : 'center',
                                                              px: 2.5,
                                                          }}
                                                          selected={value == selectedNav}
                    >

                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            {value.icon}
                        </ListItemIcon>
                        <ListItemText primary={value.name.toString()} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>))
                    }


                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {selectedNav.content}
            </Box>
        </Box>
    </>;
}
