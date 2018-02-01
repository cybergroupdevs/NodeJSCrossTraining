const express = require('express');
const router = express.Router();
const employee = require('./../../controllers/employee').employee;

router.post('/register', (req, res) => {
    return employee.register(req.body).then((response) =>{
        res.send(response)
    })
    // res.send(d);
});


module.exports = router;