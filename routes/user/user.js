const express = require('express');
const router = express.Router();
const Employee = require('./../../controllers/employee').employee;


//Added api to delete user
router.delete('/deleteEmployee', (req, res) => {
    return Employee.deleteUser(req.body).then((response) =>{
        res.send(response)
    },(error)=>{
        res.send(error)
    })
});


module.exports = router;