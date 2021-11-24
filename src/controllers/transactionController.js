import * as userRepository from "../repositories/userRepository.js";
import * as transactionRepository from "../repositories/transactionRepository.js";

import * as transactionService from "../services/transactionService.js";

const postTransaction = async (req, res) => {
	try {
		const authorization = req.headers.authorization || "";
		const token = authorization.split('Bearer ')[1];

		if (!token) return res.sendStatus(401);

		let user;

		try {
			user = userRepository.findUserByToken(token)
		} catch {
			return res.sendStatus(401);
		}

		const { value, type } = req.body;

		if (!value || !type) return res.sendStatus(400);

		if (!['INCOME', 'OUTCOME'].includes(type)) return res.sendStatus(400);

		if (value < 0) return res.sendStatus(400);

		await transactionRepository.createTransaction({
			userId: user.id,
			value,
			type
		})

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

const getTransactions = async (req, res) => {
	try {
		const authorization = req.headers.authorization || "";
		const token = authorization.split('Bearer ')[1];

		if (!token) return res.sendStatus(401);

		let user;

		try {
			user = userRepository.findUserByToken(token)
		} catch {
			return res.sendStatus(401);
		}

		const events = await transactionRepository.getTransactions(user.id)

		res.send(events);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

const getBalance = async (req, res) => {
	try {
		const authorization = req.headers.authorization || "";
		const token = authorization.split('Bearer ')[1];

		if (!token) return res.sendStatus(401);

		let user;

		try {
			user = userRepository.findUserByToken(token)
		} catch {
			return res.sendStatus(401);
		}

		const events = await transactionRepository.getTransactions(user.id)

		const sum = transactionService.calculateBalance(events)

		res.send({ sum });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}


export {
	postTransaction,
	getTransactions,
	getBalance
}