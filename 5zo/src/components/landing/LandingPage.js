import React from 'react';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
class LandingPage extends React.Component {
    render() {
        return (
            <div className='Landing'>
                <Header/>
                <Body />
                <Footer/>
            </div>
        );
    }
}

export default LandingPage;