import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <a href="/"><h1 className="headerHeading">The Data Brew</h1></a>
            <div >
                <a href="/" className="subheadingHeader">Home</a>
                <a href="/page/About" className="subheadingHeader">About</a>
                <a href="/page/contact" className="subheadingHeader">Contact Us</a>
            </div>
            <div className="whiteBar"></div>
        </div>
    );
};

export default Header;
