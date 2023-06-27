import { GoogleBook } from "../../../../models/index.js";
import axios from "axios"; 
import extractBookInfo from "./extractBookInfo.js";
const getGoogleBookAPIKey = require("./googleBookFunctions/getGoogleBookAPIKey.js")

async function searchBooks(req, res) {
  try {
    const { q } = req.query;
    const apiKey = getGoogleBookAPIKey();
    const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`;
    const response = await axios.get(requestUrl);
    const bookInfo = extractBookInfo(response.data.items[0].volumeInfo);
    const existingBook = await GoogleBook.query().findOne({ title: bookInfo.title, userId: req.user.id });
    if (existingBook) {
      return res.status(422).json('This book is already in your library.');
    }
    const insertedBook = await GoogleBook.query().insert({ ...bookInfo, userId: req.user.id, username: req.user.username });
    return res.status(200).json({ book: insertedBook });
  } catch (error) {
    console.error('Error in search:', error);
    return res.status(500).json({ error: 'An error occurred while searching for books.' });
  }
}

export default searchBooks;