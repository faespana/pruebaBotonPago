const express = require("express");
const router = express.Router();

const {
  findAll,
  createOne,
  createLogin,
  getTransactions,
} = require("./pagoplux.controller");

router.get("/pagoplux", findAll);
router.post("/signup", createOne);
router.post("/login", createLogin);
router.get("/transactions", getTransactions);

module.exports = router;
