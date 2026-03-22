const express = require("express");
const router = express.Router();

const transactionController = require("./transacionController");

router.post("/transaction", transactionController.addTransaction);

router.get("/transaction", transactionController.getTransaction);

router.delete("/transaction/:id",transactionController.deleteTransaction);

module.exports = router;