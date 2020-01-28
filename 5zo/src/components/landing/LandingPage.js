import React from 'react';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import "./FontIndex.css"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    typography: {
        fontFamily: 'CookieRun Bold',
    },
});
class LandingPage extends React.Component {
    render() {
        return (
            <div className='Landing'>
                <MuiThemeProvider>
                    <Header />
                    <Body />
                    <Footer />
                </MuiThemeProvider>

            </div>
        );
    }
}

export default LandingPage;