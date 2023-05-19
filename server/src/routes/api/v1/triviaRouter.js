import express from 'express';
import objection from 'objection';
import axios from 'axios';

const triviaRouter = new express.Router();

triviaRouter.get('/', async (req, res) => {
  try {
    const { amount } = req.query;
    const response = await axios.get(`https://opentdb.com/api.php?category=10&amount=${amount}`, {
    });
    res.json(response.data.results)
  } catch (error) {
    console.error('Error fetching trivia:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default triviaRouter;