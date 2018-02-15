const mongoose = require('mongoose');
const dbSchema = require('./../schema/schema');
const crypto = require('./../utility/response').encrypt_decrypt;

var employeeSchema = new mongoose.Schema(dbSchema.collections["employee"]);
employeeSchema.index({'emailAddress' : 1}, {unique : true});
employeeSchema.index({'employeeCode' : 1}, {unique : true});

employeeSchema.methods = {
	validatePassword:(password, passwordHash, passwordSalt) => {
        var encyrptKey = crypto.encrypt(password,passwordSalt);
        return (encyrptKey == passwordHash);	
        }
};

employeeSchema.statics = {

    saveEmployeeToDatabase: (employeeObj) => {
        return Employee.create(employeeObj).then((result) => {
            console.log('employee saved with details', result);
            return result;
        });
        return null;
    },

    getEmployeeByEmail: (emailAddress) => {
        return Employee.findOne({"emailAddress":emailAddress}).exec();
    },

    getUserById:(userId) => {
        return Employee.findOne({_id :userId}).exec();
    },

    getEmployeeList: (pageNo, limit, skills, gender) => {

        if (skills) {
            skills = skills.split(",");  //Getting array from comma seprated list of filters
        }
        var criteria = { "$and": [] };
        if (skills && skills.length > 0) {
            skills = skills.map((s) => { return new RegExp(s, "i") }) //handeling diff case for filters
            criteria["$and"].push({ skills: { "$in": skills } })
        }

        if (gender) {
            gender = gender.toUpperCase() //In db we have gender always in capital letter
            criteria["$and"].push({ gender: gender })
        }
        criteria = (criteria["$and"].length > 0) ? criteria : {};
        return Employee.find(criteria).skip((pageNo - 1) * limit).limit(limit).exec();
    },

    deleteEmployeeFromDatabase :(userId) => {
        return Employee.findOneAndRemove({_id :userId}).exec();
    }

};

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = {Employee};