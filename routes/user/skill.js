const express = require('express');
const router = express.Router();
const Skill = require('./../../controllers/skills').skills;

router.post('/addskill', (req, res) => {
    return Skill.addskill(req.body, req.user).then((response) => {
        if (Array.isArray(response)) {
            response = response[0];
        }
        res.send(response)
    })
});

router.get('/listskill', (req, res) => {
    return Skill.listskill(req.body).then((response) => {
        if (Array.isArray(response)) {
            response = response[0];
        }
        res.send(response)
    })
});

module.exports = router;