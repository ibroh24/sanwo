const router = require('express').Router();
const {authCheck} = require('../middlewares/authMiddleware')
const {addDebt, findUserDebt, update} = require('../controllers/debt.controller')

router.post('/addDebt', authCheck, addDebt);
router.get('/getUserDebt', authCheck, findUserDebt);
router.put('/updatedebt/:debtId',authCheck, update);

module.exports = router;