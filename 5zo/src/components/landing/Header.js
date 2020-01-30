import { Router, Route } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";
import React from 'react';
import {
    Relative, Absolute, Flex, NavLink, Button
} from 'rebass'
import styled, { css } from 'styled-components'


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";



class Header extends React.Component {
    drawRouter() {
        return (
            <div>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </div>
        );
    }
    render() {
        return (
            <Relative pb={5} >
                <Absolute zIndex={1} left={0} right={0} top={0}>
                    <Flex is="header" p={3} bg="#1C1C1C" color="white">
                        <NavLink href="/defLand" fontSize={3}>Today I learned</NavLink>
                        <NavLink href="/login" ml='auto'>Sign in</NavLink>
                        <Button bg="#1C1C1C" border="1px solid #e7e7e7" borderRadius="5px">
                            <NavLink href="/register" ml='auto'>Sign up</NavLink>
                        </Button>
                    </Flex>
                </Absolute>
            </Relative>
        )
    }
}

export default Header