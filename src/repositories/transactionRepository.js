import connection from "../database.js";

const createTransaction = async ({ userId, value, type }) => {
	await connection.query(
		`INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
		[userId, value, type]
	);
}

const getTransactions = async id => {
	const transactions = await connection.query(
		`SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
		[id]
	);

	return transactions.rows
}

export {
	createTransaction,
	getTransactions
}