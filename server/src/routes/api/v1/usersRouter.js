import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: errors.message });
  }
});

usersRouter.get('/', async (req, res) => {
  const userData = req.user;
  try {
    const user = await User.query().findById(userData.id);
    const userBooks = await user.$relatedQuery('googleBooks');
    user.books = userBooks;
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getting user:', error);
  }
});

export default usersRouter;