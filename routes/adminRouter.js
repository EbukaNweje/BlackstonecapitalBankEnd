const router = require("express").Router()
const { confirmDeposit, confirmWithdraw, addProfit } = require("../controllers/Admin")


router.post('/confirm-deposit/:depositId', confirmDeposit)
router.post('/confirm-withdrawal/:withdrawId', confirmWithdraw)
router.post('/add-profit/:id', addProfit)

module.exports = router
