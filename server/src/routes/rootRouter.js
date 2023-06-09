import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import booksRouter from "./api/v1/booksRouter.js";
import goodreadsTrendingRouter from "./api/v1/goodreadsTrendingRouter.js";
import triviaRouter from "./api/v1/triviaRouter.js";
import googleMapsRouter from "./api/v1/googleMapsRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);

rootRouter.use("/api/v1/books", booksRouter)
rootRouter.use("/api/v1/trending", goodreadsTrendingRouter)
rootRouter.use("/api/v1/trivia", triviaRouter)
rootRouter.use("/api/v1/googleMaps", googleMapsRouter)

export default rootRouter;
