import React from "react";

const BookTile = ({ title, author }) => {

    return (
        <div className='primary home-box small-5 book-tile'>
            <h3>{title}</h3>
            <h4>{author}</h4>
        </div>
    )
}

export default BookTile;