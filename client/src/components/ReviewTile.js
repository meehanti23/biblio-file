import React from "react"

const ReviewTile = ({ reviewBody }) => {
    return (
        <div className="review-tile">
            <p>{reviewBody}</p>
        </div>
    )
}

export default ReviewTile;