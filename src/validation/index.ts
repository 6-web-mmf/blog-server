import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { constants as status } from "http2";

export default (req: Request, res: Response, next: NextFunction) => {
	const errors: Result<ValidationError> = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		return res.status(status.HTTP_STATUS_BAD_REQUEST).json(errors.array());
	}
	next();
}
