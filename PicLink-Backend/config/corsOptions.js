const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
