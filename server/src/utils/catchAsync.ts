import { RequestHandler } from "express";

const catchAsync = (fn: RequestHandler) => (req, res, next) => {
	console.log("handler run");
	(fn(req, res, next) as any).catch((err) => {
		console.log("Error caught calling next");
		next(err);
	});
};

export default catchAsync;
