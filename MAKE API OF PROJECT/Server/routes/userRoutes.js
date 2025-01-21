const express = require('express');
const { validator } = require('../middlewares/validator');
const { registerUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const { authenticator } = require('../middlewares/authenticator');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticator, getAllUsers);
router.get('/:id', authenticator, getUserById);
router.put('/:id', authenticator, validator, updateUser);
router.delete('/:id', authenticator, validator, deleteUser);

module.exports = router;
