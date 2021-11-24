import connection from "../database";
import jwt from "jsonwebtoken";

const findByEmail = async (email) => {
	const existingUserWithGivenEmail = await connection.query(
		`SELECT * FROM "users" WHERE "email"=$1`,
		[email]
	);

	if (existingUserWithGivenEmail.rowCount > 0) {
		return existingUserWithGivenEmail.rows[0];
	}

	return null
}

const createUser = async (body) => {

	const { name, email, hashedPassword } = body

	await connection.query(
		`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
		[name, email, hashedPassword]
	);
}

const createSession = id => jwt.sign({ id }, process.env.JWT_SECRET);

const findUserByToken = token => jwt.verify(token, process.env.JWT_SECRET);

export {
	findByEmail,
	createUser,
	createSession,
	findUserByToken
}