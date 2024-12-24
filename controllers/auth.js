const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie');

exports.createUser = async (req, res) => {
	try {
		const {name, email, password, role} = req.body;

		// console.log('email- ', email);
		// console.log('password- ', password);

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Email And Password is Required',
			});
		}

		const user = await User.findOne({email});

		// console.log('user- ', user);

		if (user) {
			return res.status(400).json({
				success: false,
				message: 'User Already Registered',
			});
		}
		let hashedPassword;
		try {
			hashedPassword = await bcrypt.hash(password, 10);
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Error in Hashing Password',
			});
		}
		console.log('hpass- ', hashedPassword);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		return res.status(200).json({
			success: true,
			message: 'User Created Successfully',
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'User Cannot Be Formed',
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if (!user) {
			return res.status(400).json({
				status: false,
				message: 'User Not Registered',
			});
		}

		let payload = {
			email: user.email,
			id: user._id,
			role: user.role,
		};

		if (await bcrypt.compare(password, user.password)) {
			let token = jwt.sign(payload, process.env.SECRET_KEY, {
				expiresIn: '3h',
			});
			user.token = token;
			user.password = undefined;
			const options = {
				expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000),
				httpOnly: true,
			};
			return res.cookie('token', token, options).status(200).json({
				success: true,
				token,
				user,
				message: 'User Login Successfully',
			});
		} else {
			return res.status(400).json({
				status: false,
				message: 'Password not match',
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: false,
			message: 'Error in Login',
		});
	}
};
