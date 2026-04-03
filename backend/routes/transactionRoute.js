const express = require("express");
const router = express.Router();

const auth = require('../middleware');
const transactionController = require("../controllers/transactionController");

router.post("/transaction", auth, transactionController.addTransaction);

router.get("/transaction", auth , transactionController.getTransaction);

router.delete("/transaction/:id", auth , transactionController.deleteTransaction);

module.exports = router;