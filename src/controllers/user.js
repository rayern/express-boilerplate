import jwt from "jsonwebtoken";
import db from "../models/index.js";
import asyncWrapper from "../middleware/async.js";
import APIError from "../errors/APIError.js";
import "dotenv/config";
import bcrypt from "bcrypt"

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
export const login = asyncWrapper(async (req, res) => {
	const { email, password } = req.body;
	const user = await db.user.findOne({
		where: { email: email },
	});
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			user.last_login = new Date
			user.save()
			const jwtToken = createToken(user.id);
			return res
				.cookie("jwt", jwtToken, {
					maxAge: process.env.JWT_EXPIRE,
					httpOnly: true,
				})
				.status(200)
				.json({
					success: true,
					data: user,
					message: "User logged in successfully",
				});
		}
		throw new APIError("Incorrect password", 400);
	}
	throw new APIError("Incorrect email", 400);
});

export const signup = asyncWrapper(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	let user = await db.user.findOne({
		where: { email: email },
	});
	if (user) {
		throw new APIError("User already exists", 400);
	}
	const salt = await bcrypt.genSalt()
	const hashPassword = await bcrypt.hash(password, salt)
	user = await db.user.create({
		email: email,
		first_name: firstName,
		last_name: lastName,
		password: hashPassword,
		last_login: new Date
	});
	const jwtToken = createToken(user.id);
	return res
		.cookie("jwt", jwtToken, {
			maxAge: process.env.JWT_EXPIRE,
			httpOnly: true,
		})
		.status(200)
		.json({
			success: true,
			data: user,
			message: "User signed up successfully",
		});
});

export const logout = asyncWrapper(async (req, res) => {
	res.clearCookie(process.env.AUTH_COOKIE_NAME);
	return res
		.status(200)
		.json({ success: true, message: "User logged out successfully" });
});
