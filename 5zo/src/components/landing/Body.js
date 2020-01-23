import React from 'react';
import { Container } from '@material-ui/core';
import Register from '../Auth/Register';
import {
    Provider, Heading, Subhead, Flex, Box
} from 'rebass'
import {
    Hero
} from 'react-landing-page'

class Body extends React.Component {
    render() {
        return (
            <Provider>
                <Hero color="hotpink" bg="white">
                    <Flex mt={3}>
                        <Container>
                        </Container>
                    </Flex>
                    <Flex mt={3}>
                        <Box width={[1, 1, 1]} p={4} >
                            <Heading textAlign='center'>Til the end</Heading>
                            <Subhead textAlign='center'>Today I leanred</Subhead>
                        </Box>
                        <Box width={[1, 1, 1]} p={4} >
                            <Register />
                        </Box>
                    </Flex>
                </Hero>
                <Hero color="hotpink" bg="white">
                    <Heading>TIL THE END </Heading>
                    <Subhead>a couple more words</Subhead>
                </Hero>
            </Provider>
        )
    }
}

export default Body