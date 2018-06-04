const express = require('express');
const router = express.Router();
const voterCtrl = require("../controllers/voters");

router.get("/:idCardNumber", voterCtrl.getVoterDetails);
module.exports = router;