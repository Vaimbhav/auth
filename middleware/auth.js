const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.auth = (req, res, next) => {
	try {
		const token =
			req.body.token ||
			req.cookies.token ||
			req.header('Authorization').replace('Bearer ', '');
		// console.log('token- ', token);
		if (!token) {
			return res.status(400).json({
				success: false,
				message: 'Token Not found',
			});
		}
		try {
			const payload = jwt.verify(token, process.env.SECRET_KEY);
			// console.log('payload -> ', payload);
			req.user = payload;
			// console.log('user-> ', req.user);
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Invalid Token',
			});
		}
		next();
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: 'Auth Not Successful',
		});
	}
};

exports.isStudent = async (req, res, next) => {
	try {
		if (req.user.role !== 'Student') {
			return res.status(400).json({
				success: false,
				message: 'Auth For isStudent Failed ',
			});
		}
		next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Role not Found',
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.role !== 'Admin') {
			return res.status(400).json({
				success: false,
				message: 'Auth For isAdmin Failed ',
			});
		}
		next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Role not Found',
		});
	}
};
