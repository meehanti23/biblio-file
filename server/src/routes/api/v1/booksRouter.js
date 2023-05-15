import express from 'express';
import objection from 'objection';
import { Book } from '../../../models/index.js';

const booksRouter = new express.Router();

booksRouter.get('/', async (req, res) => {
    try {
        const books = await Book.query();
        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
    }
);

export default booksRouter;