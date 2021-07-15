const router = require('express').Router();
const {addDebt, findUserDebt} = require('../controllers/debt.controller')

router.post('/addDebt', addDebt);
router.get('/getUserDebt/:debtType', findUserDebt);


module.exports = router;