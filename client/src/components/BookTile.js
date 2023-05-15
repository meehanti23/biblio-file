import React from "react";

const BookTile = (props) => {
    const { title, author } = props.book
    return (
        <div className='primary home-box'>
            <h3>{title}</h3>
            <h4>{author}</h4>
        </div>
    )
}

export default BookTile;