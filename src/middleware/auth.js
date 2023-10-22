import db from "../models/index.js"
import jwt from "jsonwebtoken"
import APIError from "../errors/APIError.js"
import "dotenv/config"
import asyncWrapper from "../middleware/async.js"

const auth = asyncWrapper(async (req, res, next) => {
	if(!req.cookies.jwt){
		throw new APIError("Unauthorized", 403)
	}
	const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
	req.user = await db.user.findByPk(id)
	if (req.user == null) {
		throw new APIError("Unauthorized", 403)
	}
	return next()
})

export default auth