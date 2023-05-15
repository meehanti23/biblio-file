// import express from 'express';
// import objection from 'objection';
// import { Book, GoogleBook } from '../../../models/index.js';
// import axios from 'axios';

// const booksRouter = new express.Router();


// booksRouter.get('/', async (req, res) => {
//   try {
//     const { q } = req.query;
//     const apiKey = process.env.GOOGLE_API_KEY;
//     const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`;
//     const response = await axios.get(requestUrl);
//     if (response.status === 200) {
//       const volumeID = response.data.items[1].id;
//       return res.status(200).json({ volumeID });
//     } else {
//       console.error('Error in search:', response.data.error);
//       return res.status(500).json({ error: 'An error occurred while searching for books.' });
//     }
//   } catch (error) {
//     console.error('Error in search:', error);
//     return res.status(500).json({ error: 'An error occurred while searching for books.' });
//   }
// });

// booksRouter.post('/', async (req, res) => {
  
//   console.log(req.body)
//   const { volumeID } = req.body;
//   try {
//     const insertedBook = await GoogleBook.query().insert({ volumeID });
//     return res.status(200).json({ book: insertedBook });
//   } catch (error) {
//     console.error('Error in inserting book:', error);
//     return res.status(500).json({ error: 'An error occurred while inserting the book.' });
//   }
// });

// export default booksRouter;
import express from 'express';
import { GoogleBook } from '../../../models/index.js';
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
    const { volumeID } = req.body;
    const insertedBook = await GoogleBook.query().insert({ volumeID });
    return res.status(200).json({ book: insertedBook });
  } catch (error) {
    console.error('Error in inserting book:', error);
    return res.status(500).json({ error: 'An error occurred while inserting the book.' });
  }
});

export default booksRouter;
