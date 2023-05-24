import express from 'express';
import { GoogleBook, User } from '../../../models/index.js';
import axios from 'axios';
import bookReviewsRouter from './bookReviewsRouter.js';

const booksRouter = express.Router();

booksRouter.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`;
    const response = await axios.get(requestUrl);
    const body = response.data.items[0].volumeInfo;
    const categoryArray = Array.isArray(body.categories) ? body.categories : [body.categories];
    const categories = categoryArray.join(', ');
    const authorsArray = Array.isArray(body.authors) ? body.authors : [body.authors];
    const authors = authorsArray.join(', ');
    const insertedBook = await GoogleBook.query().insert({ 
      title: body.title, 
      authors: authors, 
      pageCount: body.pageCount, 
      description: body.description, 
      categories: categories, 
      smallImage: body.imageLinks.smallThumbnail, 
      largeImage: body.imageLinks.thumbnail, 
      userId: req.user.id, 
      username: req.user.username 
    });
      if (response.status === 200) {
      return res.status(200).json({ book: insertedBook });
    } else {
      console.error('Error in search:', response.data.error);
      return res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
  } catch (error) {
    console.error('Error in search:', error);
    return res.status(500).json({ error: 'An error occurred while searching for books.' });
  }
});

booksRouter.get('/library', async (req, res) => {
    try {
        const books = await GoogleBook.query().orderBy('createdAt', 'desc');
        return res.status(200).json({ books });
    } catch (error) {
        console.error('Error in getting books:', error);
        return res.status(500).json({ error: 'An error occurred while getting books.' });
    }
});

booksRouter.get('/:id', async (req, res) => {
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
});

booksRouter.delete('/:id', async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;
  try {
    const bookToDelete = await GoogleBook.query().findById(bookId);
    if (bookToDelete.userId === userId) {
      await GoogleBook.query().deleteById(bookId);
      return res.status(200).json({ message: 'Book deleted successfully.' });
    } else {
      return res.status(403).json({ error: 'You are not authorized to delete this book.' });
    }
  } catch (error) {
    console.error('Error in deleting book:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the book.' });
  }
});

booksRouter.patch('/:id', async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;
  const { bookStatus } = req.body;
  try {
    const bookToUpdate = await GoogleBook.query().findById(bookId);
    if (bookToUpdate.userId === userId) {
      const updatedBook = await GoogleBook.query().patchAndFetchById(bookId, { bookStatus });
      return res.status(200).json({ book: updatedBook });
    } else {
      return res.status(403).json({ error: 'You are not authorized to update this book.' });
    }
  } catch (error) {
    console.error('Error in updating book:', error);
    return res.status(500).json({ error: 'An error occurred while updating the book.' });
  }
});

booksRouter.use("/:id/reviews", bookReviewsRouter);

export default booksRouter;
