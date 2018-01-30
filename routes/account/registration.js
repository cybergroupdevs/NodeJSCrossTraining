const express = require('express');
const router = express.Router();
const { employee } = require('./../../models/employee');
const responseUtility = require('./../../utility/response').response;

router.post('/register', (req, res) => {
    var newEmployee = new employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    });

    newEmployee.save().then((employee) => {
        var response = responseUtility.makeResponse(true,{employee},null,null);
        res.send(response);
    }, (error) => {
        var response = responseUtility.makeResponse(false,null,"Supplied parameters are not valid" + error,400);
        res.status(400).send(response);
    })
});


module.exports = router;