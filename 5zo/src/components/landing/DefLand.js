import React from 'react';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import "./FontIndex.css"

class DefLand extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Body location={this.props.location} />
                <Footer />
            </div>
        );
    }
}

export default DefLand;