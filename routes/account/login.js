const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;

router.post('/login', (req, res) => {
    return Employee.signin(req.body).then((response) =>{
        res.send(response)
    })
});


module.exports = router;