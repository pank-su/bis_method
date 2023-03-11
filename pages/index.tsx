import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Slider,
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
import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import 'katex/dist/katex.min.css'


const navs = [new NavEl("Теория", <InfoOutlinedIcon/>, <><Info/></>),
    new NavEl("Работа", <DoneOutlinedIcon/>, <><BisectionMethod/></>)]


function valuetext(value: number) {
    return `${value}°C`;
}


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
            if (b > 0 && a != 0) {
                eq += "+"
            }
            eq += b == 1 ? "x^2" : b + "x^2"
        }
        if (c != 0) {
            if (c > 0 && (b != 0 || a != 0)) {
                eq += "+"
            }
            eq += c == 1 ? "x" : c + "x"
        }
        if (d != 0) {
            if (d > 0 && (c != 0 || b != 0 || a != 0)) {
                eq += "+"
            }
            eq += d
        }

        return eq + "$$"
    }, [a, b, c, d]);

    const dataForGraph = useMemo(function () {
        if (a == 0 && b == 0 && c == 0 && d == 0) {
            return [{x: 0, y: 0}]
        }
        let data = []
        for (let i = -7; i < 7; i += 0.01) {
            data.push({x: i, y: a * i * i * i + b * i * i + c * i + d})
        }
        return data

    }, [a, b, c, d])
    const minX = useMemo(function () {
        return Math.min(...dataForGraph.map((d) => d.x))
    }, [dataForGraph])
    const minY = useMemo(function () {
        return Math.min(...dataForGraph.map((d) => d.y))
    }, [dataForGraph])

    const [Xs, setXs] = useState<number[]>([1, 2])
    const [E, setE] = useState(0.01)
    const [stages, setStages] = useState<string[]>([])

    const addStage = (stage: string) => setStages((prevState) => [...prevState, stage])
    const clearStages = () => setStages((prevState) => [])

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setXs([Math.min(newValue[0], Xs[1] - 1), Xs[1]]);
        } else {
            setXs([Xs[0], Math.max(newValue[1], Xs[0] + 1)]);
        }
    };

    const bisMethod = function (a: number, b: number, c: number, d: number, x1: number, x2: number, E: number) {
        clearStages()
        let y1 = a * x1 * x1 * x1 + b * x1 * x1 + c * x1 + d
        let y2 = a * x2 * x2 * x2 + b * x2 * x2 + c * x2 + d
        if (y1 == 0) {
            addStage(`${x1} - является корнем`)
            return
        }

        if (y2 == 0) {
            addStage(`${x2} - является корнем`)
            return;
        }
        if ((y1 > 0 && y2 > 0) || (y1 < 0 && y2 < 0)) {
            addStage("Значения не подходят для работы программы, так как график не пересакает ось OX")
            return;
        }

        let isReversed = y1 > 0 && y2 < 0
        // addStage(`${isReversed}`)
        let ind = 1
        while (Math.abs(x1 - x2) > E) {
            let message = `${ind}. Вычисляю  $ξ_${ind} = `
            let newX = (x1 + x2) / 2;
            message += newX + "$ "
            let newY = a * newX * newX * newX + b * newX * newX + c * newX + d
            message += "Вычисляю значение y в этой точке: $y = " + newY + "$ "
            if (newY < 0 && !isReversed) {
                x1 = newX
            } else if (newY == 0) {
                addStage(message)
                addStage("$x " + newX + "$")
                return;
            } else if (newY > 0 && isReversed) {
                x1 = newX
            } else {
                x2 = newX
            }
            message += " Новые ограничения $x \\in" + "[" + x1 + ";" + x2 + "]$"
            addStage(message)
            ind++
        }
        addStage("x = " + (x1 + x2) / 2)
    }

    // style={{width: "92vw", height: "85vh", borderWidth: 0}}
    return <>
        <Grid container>
            <Grid xs={12} style={{margin: "auto"}}>
                <Stack>
                    <Typography>
                        Введите коэффициенты:
                    </Typography>
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
            </Grid>
            <Grid xs={6} style={{margin: 'auto'}}>
                {dataForGraph.length > 1 ? <Stack width={600}>
                    <ResponsiveContainer width={600} aspect={1.5 / 1}>
                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis
                                dataKey="y"
                                domain={['auto', 'auto']}
                                type="number"
                                interval={0}
                                label={{
                                    value: `y`,
                                    style: {textAnchor: 'middle'},
                                    angle: -90,
                                    position: 'left',
                                    offset: 0,
                                }}
                                allowDataOverflow={true}
                                strokeWidth={minX < 0 ? 0 : 1}
                            />
                            <XAxis
                                dataKey="x"
                                domain={['auto', 'auto']}
                                interval={0}
                                type="number"
                                label={{
                                    key: 'xAxisLabel',
                                    value: 'x',
                                    position: 'bottom',
                                }}
                                allowDataOverflow={true}
                                strokeWidth={minY < 0 ? 0 : 1}
                            />

                            {minY < 0 && (
                                <ReferenceLine
                                    y={0}
                                    stroke="gray"
                                    strokeWidth={1.5}
                                    strokeOpacity={0.65}
                                />
                            )}
                            {minX < 0 && (
                                <ReferenceLine
                                    x={0}
                                    stroke="gray"
                                    strokeWidth={1.5}
                                    strokeOpacity={0.65}
                                />
                            )}

                            <Line
                                strokeWidth={2}
                                data={dataForGraph}
                                dot={false}
                                type="monotone"
                                dataKey="y"
                                stroke="black"
                                tooltipType="none"
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    <Slider
                        getAriaLabel={() => 'Дистанция'}
                        value={Xs}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        min={-8}
                        max={8}
                        style={{width: 600 - 65, marginLeft: 60}}
                    />
                    <Typography textAlign={"center"}>
                        Начальные ограничения ↑
                    </Typography>
                    <TextField
                        error={false}
                        required={true}
                        id="outlined-number"
                        label="ε"
                        type="number"
                        value={E}
                        inputProps={{
                            maxLength: 13,
                            step: 0.01

                        }}
                        onChange={(event) => setE(Number(event.target.value))}
                        style={{width: 200, margin: "auto"}}
                    />
                    <Button style={{width: 100, margin: "auto", marginTop: 10}} variant="outlined"
                            onClick={() => bisMethod(a, b, c, d, Xs[0], Xs[1], E)}>Решить</Button>
                </Stack> : <></>}
            </Grid>
            <Grid xs={6}>
                <List>
                    {stages.map((value) => (<ListItem key={value}>
                        <Latex>
                            {value}
                        </Latex>
                    </ListItem>))}

                </List>
            </Grid>
        </Grid>
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
                        Метод половинного деления
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
