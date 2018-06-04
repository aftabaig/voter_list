const express = require('express');
const router = express.Router();

router.use("/areas", require("./areas"));
router.use("/voters", require("./voters"));
module.exports = router;
