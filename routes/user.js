const router = require('express').Router();
const {register} = require('../controllers/user.controller')

router.post('/register', register);
// router.post('/login')

module.exports = router;