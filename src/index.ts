import {NextFunction} from "express";

declare global {
	namespace Express {
		interface Request {
			context: {
				[key: string]: any
			}
		}

		interface Response {
			context: {
				[key: string]: any
			}
		}
	}
}

/** Middleware that creates a new empty object on the Request and Response object */
const expressContext = () => (req: Express.Request, res: Express.Response, next: NextFunction) => {
	req.context = {};
	res.context = {};
	next();
};

export default expressContext;
