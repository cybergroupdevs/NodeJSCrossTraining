const express = require('express');
const router = express.Router();
const { employee } = require('./../../controllers/employee');

router.get('/userdetail', (req, res) => {
    return employee.detail(req.query).then((response) =>{
        if(Array.isArray(response)){
            response = response[0];
        }
        res.send(response)
    })
});


module.exports = router;