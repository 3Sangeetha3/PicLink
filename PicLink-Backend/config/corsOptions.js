const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
