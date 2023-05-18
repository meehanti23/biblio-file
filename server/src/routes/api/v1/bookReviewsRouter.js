import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Review } from "../../../models/index.js";

const bookReviewsRouter = new express.Router({ mergeParams: true });

bookReviewsRouter.post('/', async (req, res) => {
    const reviewBody = req.body;
    const bookId = req.params.id;
    const reviewer = req.user.id;
    console.log('reviewer!!!!', req.params)
    const formDataWithId = { ...reviewBody, bookId, userId: reviewer };
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

export default bookReviewsRouter;