import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = (props) => {
    return (
        <div className='primary home-box'>
            <h1 className='page-title'>Catalog Your Personal Library!</h1>
            <div className='about-link-wrapper'>
            </div>
            <img src="https://personal-library-bucket.s3.amazonaws.com/pngwing.com.png" alt="homepage-shelf"/>
            <Link to="/truth" className='truth-link'>A</Link>
            <Link to="/about" className="about-link">About the Developer</Link>
        </div>
    )
}

export default Homepage;