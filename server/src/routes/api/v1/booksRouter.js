import express from 'express';
import bookReviewsRouter from './bookReviewsRouter.js';
import { searchBooks, getUserLibrary, getBookById, deleteBookById, updateBookStatusById } from './routerFunctions/index.js';

const booksRouter = express.Router();

booksRouter.get('/', searchBooks);

booksRouter.get('/library', getUserLibrary);

booksRouter.get('/:id', getBookById);

booksRouter.delete('/:id', deleteBookById);

booksRouter.patch('/:id', updateBookStatusById);

booksRouter.use("/:id/reviews", bookReviewsRouter);

export default booksRouter;
