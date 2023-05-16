import express from 'express';
import { GoogleBook, User } from '../../../models/index.js';
import axios from 'axios';

const booksRouter = express.Router();

booksRouter.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`;
    const response = await axios.get(requestUrl);

    if (response.status === 200) {
      const { items: books } = response.data;
      return res.status(200).json({ books });
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
        const books = await GoogleBook.query();
        return res.status(200).json({ books });
    } catch (error) {
        console.error('Error in getting books:', error);
        return res.status(500).json({ error: 'An error occurred while getting books.' });
    }
});

booksRouter.post('/', async (req, res) => {
    try {
    const body = req.body;
    const categoryArray = Array.isArray(body.categories) ? body.categories : [body.categories];
    const categories = categoryArray.join(', ');
    const authorsArray = Array.isArray(body.authors) ? body.authors : [body.authors];
    const authors = authorsArray.join(', ');
    const insertedBook = await GoogleBook.query().insert({ title: body.title, authors: authors, pageCount: body.pageCount, description: body.description, categories: categories, smallImage: body.imageLinks.smallThumbnail, largeImage: body.imageLinks.thumbnail, userId: req.user.id, userEmail: req.user.email });
    return res.status(200).json({ book: insertedBook });
  } catch (error) {
    console.error('Error in inserting book:', error);
    return res.status(500).json({ error: 'An error occurred while inserting the book.' });
  }
});

booksRouter.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await GoogleBook.query().findById(bookId);
    return res.status(200).json({ book });
  } catch (error) {
    console.error('Error in getting book:', error);
    return res.status(500).json({ error: 'An error occurred while getting the book.' });
  }
});

export default booksRouter;
