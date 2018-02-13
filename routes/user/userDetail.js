const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;

router.get('/userdetail', (req, res) => {
    return Employee.detail(req.query).then((response) =>{
        if(Array.isArray(response)){
            response = response[0];
        }
        res.send(response)
    })
});


module.exports = router;