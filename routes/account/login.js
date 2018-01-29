const express = require('express');
const router = express.Router();
const utility = require('./../../utility');
//TODO: should we create seperate model for login because in login we only need 
//email and password as a property
const { employee } = require('./../../models/employee');
const authentication = require('./../../middleware/authentication/authentication.middleware');

router.post('/login', (req, res) => {
    employee.findOne({ "email": req.body.email, "password": req.body.password }).then((validEmployee) => {
        if (validEmployee == null) {
            var response = utility.responseObject.responseObj(false,null,"invalid email or password",401);
            res.status(401).send(response);
        }
        
        var payload = {
            email: validEmployee.email,
            type: validEmployee.userType
        }
        var response = utility.responseObject.responseObj(true,
            {token: authentication.jwtAuthentication.generate(payload)},
            null,null);
        res.send(response);

    }, (error) => {
        var response = utility.responseObject.responseObj(false,null,"invalid email or password",401);
        res.status(400).send(response);
    });
});


module.exports = router;