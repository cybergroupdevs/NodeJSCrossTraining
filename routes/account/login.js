const express = require('express');
const router = express.Router();
const { employee } = require('./../../controllers/employee');

router.post('/login', (req, res) => {
    return employee.signin(req.body).then((response) =>{
        res.send(response)
    })
});


module.exports = router;