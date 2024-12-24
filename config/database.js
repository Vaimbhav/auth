const mongoose = require('mongoose');
require('dotenv').config();

const connectWithDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('Db connected successfully');
	} catch (error) {
		console.log('Db connection failed');
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectWithDb;
