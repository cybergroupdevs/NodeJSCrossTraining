const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;


//Added api to delete user
router.delete('/deleteEmployee', (req, res) => {
    return Employee.deleteUser(req.body, req.user).then((response) =>{
        res.send(response)
    },(error)=>{
        res.send(error)
    })
});


//Added api to update user
router.post('/updateEmployee', (req, res) => {
    return Employee.updateUser(req.body, req.user).then((response) =>{
        if (Array.isArray(response)) {
            response = response[0];
        }
        res.send(response)
    },(error)=>{
        res.send(error)
    })
});



module.exports = router;