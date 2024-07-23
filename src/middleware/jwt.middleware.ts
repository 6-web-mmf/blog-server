import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const tokenRequire = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearerToken: string | undefined = req.headers.authorization?.replace(
		/Bearer\s?/,
		""
	);

	if (!bearerToken) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded: string | JwtPayload = jwt.verify(
			bearerToken,
			String(process.env.ACCESS_TOKEN_SECRET)
		);
		// @ts-ignore
		req.body.id = decoded.id;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};
