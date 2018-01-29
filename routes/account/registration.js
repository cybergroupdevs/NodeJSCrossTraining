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
        var response = utility.responseObject.responseObj(true,{employee},null);
        res.send(response);
    }, (error) => {

        res.status(400).send({ errorMessage: "Supplied parameters are not valid " + error });
    })
});


module.exports = router;