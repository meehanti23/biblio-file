import React from 'react';

const Homepage = (props) => {
    return (
        <div className='primary home-box'>
            <h1 className='page-title'>Catalog Your Personal Library!</h1>
            <img src="https://personal-library-bucket.s3.amazonaws.com/pngwing.com.png" alt="homepage-shelf"/>
            <h3>Created by Tim Meehan</h3>
            <ul className='homepage-list'><b>With Help From:</b>
                <li>Google Book API</li>
                <li>Open Trivia Database</li>
                <li>Goodreads</li>
                <li>Google Charts</li>
            </ul>
        </div>
    )
}

export default Homepage;