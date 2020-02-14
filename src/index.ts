import {NextFunction} from "express";

declare global {
	namespace Express {
		interface Request {
			context: {
				[key: string]: any
			}
		}
	}
}

const expressContext = () => (req: Express.Request, res: Express.Response, next: NextFunction) => {
	req.context = {};
	next();
};

export default expressContext;
