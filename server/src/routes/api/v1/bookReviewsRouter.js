import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Review } from "../../../models/index.js";

const bookReviewsRouter = new express.Router({ mergeParams: true });

bookReviewsRouter.post('/', async (req, res) => {
    const reviewBody = req.body;
    const bookId = req.params.id;
    const reviewer = req.user.id;
    const username = req.user.username;
    const formDataWithId = { ...reviewBody, bookId, userId: reviewer, username};
    try {
        const insertedReview = await Review.query().insertAndFetch(formDataWithId);
        insertedReview.user = reviewer
        return res.status(200).json({ reviewBody: insertedReview }); 
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data });
        }
        console.error('Error in inserting review:', error);
        return res.status(500).json({ error: 'An error occurred while inserting the review.' });
    }
});

bookReviewsRouter.delete('/:id', async (req, res) => {
    console.log("req.paramssssss", req.params)
    const reviewId = req.params.id;
    const userId = req.user.id;
    try {
        const reviewToDelete = await Review.query().findById(reviewId);
        if (reviewToDelete.userId === userId) {
            await Review.query().deleteById(reviewId);
            return res.status(200).json({ message: 'Review deleted successfully.' });
        } else {
            return res.status(401).json({ error: 'You are not authorized to delete this review.' });
        }
    } catch (error) {
        console.error('Error in deleting review:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the review.' });
    }
});

export default bookReviewsRouter;