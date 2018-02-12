const mongoose = require('mongoose');
const dbSchema = require('./../schema/schema');
const { appConfigKeys } = require('./../appconfig/appconfig');

var employeeSchema = new mongoose.Schema(dbSchema.collections["employee"]);


employeeSchema.method = {

};

employeeSchema.statics = {

    saveEmployeeToDatabase: (employeeObj) => {
        return Employee.create(employeeObj).then((result) => {
            console.log('employee saved with details', result);
            return result;
        });
        return null;
    },

    getEmployeeByEmailAndPassword: (emailAddress, password) => {
        return Employee.findOne({"emailAddress":emailAddress, "password":password}).exec();
    },

    getUserById:(emailAddress, password ) => {
        return Employee.findOne({"userId":ObjectId}).exec();
    },

    getEmployeeList: (pageNo, limit, skills, gender) => {

        if (!limit) {
            limit = appConfigKeys.pageLimit;
        } else {
            limit = parseInt(limit);
        }
        if (!pageNo) {
            pageNo = 1;
        } else {
            pageNo = parseInt(pageNo);
        }
        if (skills) {
            skills = skills.split(",");  //Getting array from comma seprated list of filters
        }

        var criteria = { "$and": [] };
        if (skills && skills.length > 0) {
            skills = skills.map((s) => { return new RegExp(s, "i") }) //handeling diff case for filters
            criteria["$and"].push({ technicalSkills: { "$in": skills } })
        }

        if (gender) {
            gender = gender.toUpperCase() //In db we have gender always in capital letter
            criteria["$and"].push({ gender: gender })
        }
        criteria = (criteria["$and"].length > 0) ? criteria : {};
        return Employee.find(criteria).skip((pageNo - 1) * limit).limit(limit).exec();
    },

    deleteEmployeeFromDatabase :(emailAddress) => {
        return Employee.findOneAndRemove({"emailAddress":emailAddress}).exec();
    }

};

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = {Employee};