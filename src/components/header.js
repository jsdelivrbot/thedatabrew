import React from 'react';
import { Link } from 'react-router';

const Header = () => {
    return (
        <div className="header">
            <a href="/"><h1 className="headerHeading">The Data Brew</h1></a>
            <div >
                <Link to={"/"} className="subheadingHeader">Home</Link>
                <Link to={"/page/about"} className="subheadingHeader">About</Link>
                <Link to={"/page/contact"} className="subheadingHeader">Contact Us</Link>
            </div>
            <div className="whiteBar"></div>
        </div>
    );
};

export default Header;
