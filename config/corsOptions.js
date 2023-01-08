const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    //FIXME: if (allowedOrigins.indexOf(origin) !== -1) { //user this when deploying to production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // origin is the equivalent of undefined. It is the first request that comes in. It is coming from the browser itself "localhost". So it is undefined. So we need to allow it. use the above code without "!origin" when developing
      https: callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;