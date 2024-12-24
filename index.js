const express = require('express');
const server = express();
const authRouter = require('./routes/auth');

const cookieParser = require('cookie-parser');
server.use(cookieParser());

require('dotenv').config();
const PORT = process.env.PORT || 1000;

const connectWithDb = require('./config/database');

server.use(express.json());
connectWithDb();

server.listen(PORT, () => {
	console.log(`Server is started at port ${PORT} `);
});

server.get('/', (req, res) => {
	res.send(`Why So Serious`);
});

server.use('/auth', authRouter);
