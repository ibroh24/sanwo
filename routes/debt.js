const router = require('express').Router();
const {addDebt, findUserDebt, update} = require('../controllers/debt.controller')

router.post('/addDebt', addDebt);
router.get('/getUserDebt/:debtType', findUserDebt);
router.put('/updatedebt/:debtId', update);

module.exports = router;