const express = require('express');
const {createUser, loginUser} = require('../controllers/auth');
const {isStudent, auth, isAdmin} = require('../middleware/auth');

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

router.get('/test', auth, async (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Welcome to Test Dashboard ',
	});
});

router.get('/isStudent', auth, isStudent, async (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Welcome to Student Dashboard ',
	});
});
``;

router.get('/isAdmin', auth, isAdmin, async (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Welcome to Admin Dashboard ',
	});
});

module.exports = router;
