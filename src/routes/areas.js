const express = require('express');
const router = express.Router();
const areaCtrl = require("../controllers/areas");

router.post("/", areaCtrl.addArea);
router.post("/:areaId/voters", areaCtrl.addVoter);
module.exports = router;