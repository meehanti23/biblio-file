import React from "react";

const ReviewList = (props) => {
    const reviews = props.reviews.map((review) => {
        debugger
        return (
            <div key={review.id}>
                <p>{review.reviewBody}</p>
            </div>
        )
    })
    return (
        <div>
            <h1>What are People Saying?</h1>
            {reviews}
        </div>
    )
}

export default ReviewList;