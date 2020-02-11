import { Route } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import React from 'react';
import {
    Provider, Heading, Subhead, Flex, Box
} from 'rebass'
import {
    Hero
} from 'react-landing-page'
import "./FontIndex.css"

  
class Body extends React.Component {
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
            <Provider >
                <Hero >
                    <Flex  mt={3} >
                        <Box width= "500px" p={4}>
                            <br /><br /><br /><br /><br /><br />
                            <Heading color="#457B82" textAlign='left'>TIL lets you work more effectively and get more done</Heading>
                            <Subhead  color="#457B82" textAlign='left'>TIL's boards, lists, and cards enable you to organize and prioritize your learing process in effective, flexible, and showable way.</Subhead>
                        </Box>
                        <Box width={[1, 1, 1/2]} p={4}>
                            <Register location = {this.props.location} />
                        </Box>
                    </Flex>

                </Hero>
                <Hero color="#457B82" bg="white">
                    <Heading>TIL THE END </Heading>
                    <Subhead>a couple more words</Subhead>
                </Hero>
            </Provider>
        )
    }
}

export default Body