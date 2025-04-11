const router = require("express").Router()
const { confirmDeposit, confirmWithdraw, addProfit, toggleUserStatus } = require("../controllers/Admin")


router.post('/confirm-deposit/:depositId', confirmDeposit)
router.post('/confirm-withdrawal/:withdrawId', confirmWithdraw)
router.post('/add-profit/:id', addProfit)
// router.put('/user/:id/status-toggle', toggleUserStatus)

module.exports = router