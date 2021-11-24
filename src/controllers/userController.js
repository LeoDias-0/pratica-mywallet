import * as userRepository from "../repositories/userRepository.js";

import * as userService from "../services/userService.js";

const signUp = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.sendStatus(400);
		}

		const existingUserWithGivenEmail = await userRepository.findByEmail(email)

		if (existingUserWithGivenEmail) {
			return res.sendStatus(409);
		}

		const hashedPassword = userService.createHash(password)

		await userRepository.createUser({ name, email, hashedPassword })

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await userRepository.findByEmail(email)

		if (!user || !userService.comparePassword(password, user.password)) {
			return res.sendStatus(401);
		}

		const token = userRepository.createSession(user.id)

		return res.send({
			token
		});
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}

export {
	signUp,
	signIn
}