const express = require('express');
const router = express.Router();
//TODO: should we create seperate model for login because in login we only need 
//email and password as a property
const { employee } = require('./../../models/employee');
const authentication = require('./../../middleware/authentication/authentication.middleware');

router.post('/login', (req, res) => {
    employee.findOne({ "email": req.body.email, "password": req.body.password }).then((validEmployee) => {
        if (validEmployee == null) {
            res.status(400).send({ errorMessage: 'invalid email/password' });
        }
        
        var payload = {
            email: validEmployee.email,
            type: validEmployee.userType
        }

        res.send({ token: authentication.jwtAuthentication.generate(payload) });

    }, (error) => {
        res.status(400).send({ errorMessage: 'invalid email/password' });
    });
});


module.exports = router;