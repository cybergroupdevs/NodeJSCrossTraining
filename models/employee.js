const mongoose = require('mongoose');
const dbSchema = require('./../schema/schema');
const { appConfigKeys } = require('./../appconfig/appconfig');

var employeeSchema = new mongoose.Schema(dbSchema.collections["employee"]);

employeeSchema.method = {

};

employeeSchema.statics = {

    saveEmployeeToDatabase:(employeeObj) => {
        return Employee.create(employeeObj).then ( (result) => {
            console.log('employee saved with details', result);
            return result;
         });
         return null;
    },

    getEmployeeByEmailAndPassword:(emailAddress, password ) => {
        return Employee.findOne({"emailAddress":emailAddress, "password":password}).exec();
    },

    getEmployeeList: (pageNo, filter, limit) => {
        console.log(limit);
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
        return Employee.find({}).skip((pageNo - 1) * limit).limit(limit).exec();
    }
};

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = {Employee};