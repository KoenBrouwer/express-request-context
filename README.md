# express-request-context

A tiny addon to [ExpressJS](https://www.npmjs.com/package/express) to help you pass data along with the Request and Response objects in your route handlers.

# Quick Start

This is a [Node.js](https://nodejs.org/en/) package available through the [npm registry](https://nodejs.org/en/).
Installation into your project is done with the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally):

	npm install --save express-request-context
	
Now add our middleware to your ExpressJS app:

	import expressContext from "express-request-context";

	const app = express();
	
	app.use(expressContext()); // This will enable the 'context' object for you.

In your route handler, you now have a `context` object available in which you can shove any object or data that gets transferred to the next route handler. For example, you can get some user data from your database and use it in your next route:

    Router.use((req, res, next) => {
		const userData = db.getUserByToken(req.headers.authorization);
       req.context.userData = userData;
       next();
    });


# Philosophy

Have you ever been building an ExpressJS backend and encoutered the problem that you want to pass some data along with the Request and Response objects to the next route handler? Right, there's no such thing as extending those objects and adding your own stuff to it (in Typescript).

### Example:

    Router.use((req, res, next) => {
        const accessToken = req.headers.authorization.token.replace("Bearer ", "");
        const userData = getUserDataFromAccessToken(accessToken);
        
        /*
        The userData object now contains some data about the user that we want to use else where to:
        - Check permissions
        - Check ownership of a resource
        - Compare ids or passwords
        - Etc.
        
        And we also need the accessToken for future stuff.
        But how to pass these things along to the next handler?
        */
        
        req.user = userData; 		// !
        res.token = accessToken 	// !
   
        next();
    });
    
This won't work when you're using Typescript, because it will throw the following error:

	TSError: ⨯ Unable to compile TypeScript:
	src/myRouteHandler.ts:124:9 - error TS2339: Property 'user' does not exist on type 'Request<ParamsDictionary>'.
	
	124                     req.user = userData;
	                            ~~~~
	src/myRouteHandler.ts:124:9 - error TS2339: Property 'token' does not exist on type 'Request<ParamsDictionary>'.
	
	125                     req.token = token;
	                            ~~~~~

Cause the `user` and `token` property don't exist on the Request object.

# Solution

This package adds a `context` object of type `any` to both the Request and Response objects of ExpressJS. You can then put whatever you like in there to include with the Request in the next route handler:

    Router.use((req, res, next) => {
        const accessToken = req.headers.authorization.token.replace("Bearer ", "");
        const userData = getUserDataFromAccessToken(accessToken);
        
        req.context.user = userData; 	// !
        res.context.token = accessToken	// !
   
        next();
    });

The only thing you need to do to get started is add the middleware in this package to your ExpressJS app:

	import expressContext from "express-request-context";

	const app = express();
	
	app.use(expressContext()); // This will enable the 'context' object for you.

Happy hacking!

# Contributing

Feel free to open an issue or a pull request in the [repo on GitHub](https://github.com/KoenBrouwer/express-request-context/pulls)!

# License

[MIT](https://en.wikipedia.org/wiki/MIT_License)

