const express = require('express');
const router = express.Router();
const authentication = require('./../middleware/authentication/authentication.middleware');

//TODO: how to require all routes from a folder such as: - require all routes from 
//account folder
router.use(require('./account'));


router.get('/', (req, res) => {
    res.send('test api');
});

router.use(authentication.jwtAuthentication.verify);
router.use(require('./user'));

module.exports = router;
