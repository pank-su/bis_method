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
import {useMemo, useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavEl from "../src/NavEl";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Latex from 'react-latex-next'
import Stack from '@mui/material/Stack';
import 'katex/dist/katex.min.css'


const navs = [new NavEl("Теория", <InfoOutlinedIcon/>, <><Info/></>),
    new NavEl("Теория 2", <InfoOutlinedIcon/>, <><BisectionMethod/></>)]


function Info() {
    return <>
        <iframe style={{width: "92vw", height: "85vh", borderWidth: 0}}
                src="https://pank-su.github.io/infoPresentation/" title="description"></iframe>
    </>
}

function BisectionMethod() {
    const [a, setA] = useState(0.)
    const [b, setB] = useState(0.)
    const [c, setC] = useState(0.)
    const [d, setD] = useState(0.)

    const equation = useMemo(function () {
        let eq = "$$"
        if (a != 0) {

            eq += a == 1 ? "x^3" : a + "x^3"
        }
        if (b != 0) {
            if (b > 0) {
                eq += "+"
            }
            eq += b == 1 ? "x^2" : b + "x^2"
        }
        if (c != 0) {
            if (c > 0) {
                eq += "+"
            }
            eq += c == 1 ? "x" : c + "x"
        }
        if (d != 0) {
            if (d > 0) {
                eq += "+"
            }
            eq += d
        }

        return eq + "$$"
    }, [a, b, c, d]);
    // style={{width: "92vw", height: "85vh", borderWidth: 0}}
    return <>
        <Stack>
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <TextField
                        id="outlined-number"
                        label="a"
                        type="number"
                        onChange={(event) => setA(Number(event.target.value))}
                    />
                </Grid>
                <Grid xs={3}>
                    <TextField
                        id="outlined-number"
                        label="b"
                        type="number"
                        onChange={(event) => setB(Number(event.target.value))}

                    />
                </Grid>
                <Grid xs={3}>
                    <TextField
                        id="outlined-number"
                        label="c"
                        type="number"
                        onChange={(event) => setC(Number(event.target.value))}
                    />
                </Grid>
                <Grid xs={3}>
                    <TextField
                        id="outlined-number"
                        label="d"
                        type="number"
                        onChange={(event) => setD(Number(event.target.value))}
                    />
                </Grid>

            </Grid>
            <Latex strict>
                {equation}
            </Latex>

        </Stack>

    </>
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
