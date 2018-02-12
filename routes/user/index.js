const express = require('express');
const router = express.Router();

router.use(require('./user'));
router.use(require('./employeelist'));
router.use(require('./userdetail'));
module.exports = router;
