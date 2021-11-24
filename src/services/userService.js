import bcrypt from "bcrypt";

const createHash = password => bcrypt.hashSync(password, 12);

const comparePassword = (testPassword, truePassword) => bcrypt.compareSync(testPassword, truePassword)

export {
	createHash,
	comparePassword
}