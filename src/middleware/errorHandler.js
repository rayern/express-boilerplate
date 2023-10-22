import APIError from "../errors/APIError.js"
import logger from "../helpers/logger.js"
const errorHandler = async (err, req, res, next) => {
	console.log(err)
	//logger.error(JSON.stringify({error: err, api: req.originalUrl, request: req.body,}))
	if (err instanceof APIError) {
		return res
			.status(err.statusCode)
			.json({ success: false, message: err.message })
	}
	return res
		.status(200)
		.json({
			success: false,
			message: "Something went wrong, please try again later",
		})
}
export default errorHandler
