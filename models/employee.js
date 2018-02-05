const mongoose = require('mongoose');
const dbSchema = require('./../schema/schema');

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
    }
};

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = {Employee};