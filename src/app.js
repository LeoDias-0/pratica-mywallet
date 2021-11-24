import express from "express";
import cors from "cors";

import * as userController from './controllers/userController.js'
import * as transactionController from './controllers/transactionController.js'

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", transactionController.postTransaction);

app.get("/financial-events", transactionController.getTransactions);

app.get("/financial-events/sum", transactionController.getBalance);

export default app;
