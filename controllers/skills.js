const mongoose = require('mongoose');
const responseUtility = require('./../utility/response').response;
const Skill = require('./../models/skills').Skill; //model class for skill
//const Employee = require('./../models/employee').Employee; //model class for Employee
const Promise = require('bluebird');

var skills = {
    addskill: (options, userObj) => {
        try {
            if (userObj.userType === 'USER') {
                return Promise.join(responseUtility.makeResponse(false, null, "Not having valid permissions to add skill", null));
            }
            if (!options['name']) {
                return Promise.join(responseUtility.makeResponse(false, null, "Skill name can't be empty", null));
            }
            // if (!isString(option['name'])) {
            //     return Promise.join(responseUtility.makeResponse(false, null, "Skill name should only be string", null));
            // }

            var skillObj = { 'name': options['name'].toUpperCase()}; // Initializing skill with name coming as param
            
            if (options['type']) {
                skillObj.type = options['type'];
            }
            return Skill.addskill(skillObj).then((result) => {
                if (!result) {
                    var response = responseUtility.makeResponse(false, null, "Invalid request", 401);
                    return response;
                }

                var response = responseUtility.makeResponse(true, result, "Skill added successfully", null);
                return response;
            }, (error) => {
                if (error && error.code === 11000) {
                    return Promise.join(responseUtility.makeResponse(false, null, "Skill with same name already exists", 11000));
                }
                return Promise.join(responseUtility.makeResponse(false, null, error, 400));
            });
        } catch (error) {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        }
    },
    listskill: (options) => {
        return Skill.listskill().then((result) => {
            if (!result) {
                var response = responseUtility.makeResponse(false, null, "Invalid request", 401);
                return response;
            }
            var response;
            response = responseUtility.makeResponse(true, result, "Skill list returned", null);
            return response;
        }, (error) => {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        });
    }
};

module.exports = { skills };
