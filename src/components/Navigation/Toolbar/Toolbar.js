import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.ToolbarContainer}>
        <div className={classes.Toolbar}>
            <NavigationItems navItems={props.navElements} clickHandler={props.itemClicked}/>
        </div>
    </header>
);

export default toolbar;