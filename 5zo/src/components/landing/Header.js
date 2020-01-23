import React from 'react';
import {
   Relative, Absolute, Flex, NavLink
} from 'rebass'

class Header extends React.Component {
    render() {
        return (
            <Relative pb={5}>
                    <Absolute zIndex={1} left={0} right={0} top={0}>
                        <Flex is="header" p={3} bg="black" color="white">
                            <NavLink href="/" fontSize={3}>Today I learned</NavLink>
                            <NavLink href="/Login" ml='auto'>Login</NavLink>
                            <NavLink href="#">Sign up</NavLink>
                        </Flex>
                    </Absolute>
            </Relative>
        )
    }
}

export default Header