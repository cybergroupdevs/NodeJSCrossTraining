const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;


router.get('/employeeList', (req, res) => {
    Employee.employeeList(req.query).then((response) => {
        if (Array.isArray(response)) {
            response = response[0];
        }
        res.send(response)
    });
});

module.exports = router;