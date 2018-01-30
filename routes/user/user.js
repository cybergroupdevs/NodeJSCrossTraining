const express = require('express');
const router = express.Router();
const { employee } = require('./../../models/employee');
const responseUtility = require('./../../utility/response').response;
const authentication = require('./../../middleware/authentication/authentication.middleware');

//Added api to delete user
router.post('/delete', (req, res) => {
    employee.findOneAndRemove({ "email":  req.body.email }).then((validEmployee) => {
        if (validEmployee == null) {
            var response = responseUtility.makeResponse(false,null,"user with this email doesn't exist",401);
            res.status(401).send(response);
        }
        var deletedEmployee = validEmployee;
        var response = responseUtility.makeResponse(true,{deletedEmployee},null,null);
        res.send(response);

    }, (error) => {
        var response = responseUtility.makeResponse(false,null,"user with this email doesn't exist",401);
        res.status(400).send(response);
    });
 

});


module.exports = router;