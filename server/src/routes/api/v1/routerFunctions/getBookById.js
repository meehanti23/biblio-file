import { GoogleBook } from "../../../../models/index.js";

async function getBookById (req, res) {
    const bookId = req.params.id;
    try {
      const book = await GoogleBook.query().findById(bookId);
      const reviews = await book.$relatedQuery('reviews');
      const reviewsWithUsers = await Promise.all(reviews.map(async review => {
        review.user = await review.$relatedQuery('user');
        return review;
      }));
      book.reviews = reviewsWithUsers;
      return res.status(200).json({ book });
    } catch (error) {
      console.error('Error in getting book:', error);
      return res.status(500).json({ error: 'An error occurred while getting the book.' });
    }
}

export default getBookById;