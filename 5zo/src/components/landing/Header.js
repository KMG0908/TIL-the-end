import React from 'react';
import {
   Relative, Absolute, Flex, NavLink, Button
} from 'rebass'
import styled, { css } from 'styled-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    typography: {
      fontFamily: 'CookieRun Bold',
    },
  });
class Header extends React.Component {
    render() {
        return (
            <Relative pb={5} >
                    <Absolute zIndex={1} left={0} right={0} top={0}>
                        <Flex is="header" p={3} bg="#1C1C1C" color="white">
                            <NavLink href="/" fontSize={3}>Today I learned</NavLink>
                            <NavLink href="/Login" ml='auto'>Sign in</NavLink>
                            <Button bg = "#1C1C1C" border="1px solid #e7e7e7" borderRadius="5px">Sign up</Button>
                        </Flex>
                    </Absolute>
            </Relative>
        )
    }
}

export default Header