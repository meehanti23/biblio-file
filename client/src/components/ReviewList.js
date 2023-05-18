import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
    const reviews = props.reviews.map((review) => {
        return (
            <ReviewTile
                key={review.id}
                reviewId={review.id}
                bookId={review.bookId}
                reviewBody={review.reviewBody}
                username={review.username}
                createdAt={review.createdAt}
            />
        )
    })
    return (
        <div className="review-list">
            <h1>What are People Saying?</h1>
            {reviews}
        </div>
    )
}

export default ReviewList;