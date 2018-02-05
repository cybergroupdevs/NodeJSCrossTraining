const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;

router.post('/register', (req, res) => {
    return Employee.register(req.body).then((response) =>{
        res.send(response)
    })
    // res.send(d);
});


module.exports = router;