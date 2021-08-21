import React, {useCallback, useState, useEffect}  from 'react';
import {createStyles, makeStyles}      from '@material-ui/core/styles';
import AppBar                          from '@material-ui/core/AppBar';
import Toolbar                         from '@material-ui/core/Toolbar';
import MenuIcon                        from "@material-ui/icons/Menu";
import IconButton                      from '@material-ui/core/IconButton';
import {useDispatch, useSelector}      from "react-redux";
import {getSignedIn}                   from "../../reducks/users/selectors";
import {HeaderMenu}                    from "./index";
import {push}                          from "connected-react-router"
import {ClosableDrawer}                from '../Header/index'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        }
    }),
);

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerToggle = useCallback(() => {
        setSideBarOpen(!sideBarOpen);
    }, [sideBarOpen])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <a
                        className="u-text__link"
                        onClick={() => dispatch(push('/'))} role="button">
                        <h1>ECサイト(デモ)</h1>
                    </a>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenu />
                            <IconButton
                                aria-label="Menu Items"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => handleDrawerToggle(e)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    );
}

export default Header