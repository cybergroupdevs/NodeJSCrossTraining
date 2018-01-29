const express = require('express');
const router = express.Router();
const { employee } = require('./../../models/employee');
const utility = require('./../../utility');

router.post('/register', (req, res) => {
    var newEmployee = new employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    });

    newEmployee.save().then((employee) => {
        var response = utility.responseObject.responseObj(true,{employee},null,null);
        res.send(response);
    }, (error) => {
        var response = utility.responseObject.responseObj(false,null,"Supplied parameters are not valid" + error,400);
        res.status(400).send(response);
    })
});


module.exports = router;