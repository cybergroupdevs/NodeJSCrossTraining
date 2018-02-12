const mongoose  = require('mongoose');
const responseUtility = require('./../utility/response').response;
const Employee = require('./../models/employee').Employee; //model class
const authentication = require('./../middleware/authentication/authentication.middleware');
const Promise = require('bluebird');

var employee = {
    register:(options)=> {
        try{
            if(((options["employeeCode"].toString()).trim()).length == 0){
                return Promise.join(responseUtility.makeResponse(false,null,'EmployeeCode can not be blank', null)); 
            }
            if (options['password'] === undefined || !options['password'])
                return Promise.join(responseUtility.makeResponse(false,null,"required password is missing", null));  
            var password = options['password'];
            var userObj = { 'userType': "USER" }; // Initializing userObj with userType as 'USER'
            if (options['employeeCode'])
                userObj.employeeCode    = options['employeeCode'].trim();
            if (options['emailAddress']){
                userObj.emailAddress = options['emailAddress'].trim();
            }
            if(options['role']){
                userObj.role = options['role'];
            }
            userObj.password = password
            userObj.passwordHash = password
            userObj.passwordSalt = password
            if (options['firstName']){
                userObj.firstName = options['firstName'];
            }
            else{
                userObj.firstName   = options['userName'].trim();
            }
            if (options['middleName']){
                userObj.middleName = options['middleName'];
            }else{
                userObj.middleName = ""
            }
            if (options['lastName']){
                userObj.lastName = options['lastName'];
            }else{
                userObj.lastName = ""
            }
            if (options['gender']){
                userObj.gender = options['gender'];
            }
            userObj['displayName'] = userObj['firstName'] + (userObj['middleName']?(" "+userObj['middleName']):"")+(userObj['lastName']?(" "+userObj['lastName']):"")
            userObj['isBlockedByAdmin'] = false;
            if(options['isAdmin']){
                userObj['isAdmin'] = false;                
            }
            if(options['technicalSkills']){
                userObj['technicalSkills'] = options['technicalSkills'];
            }
            return Employee.saveEmployeeToDatabase(userObj).then((result)=>{
                if(result){
                    var response = responseUtility.makeResponse(true,{employee:result},null,null);
                    return response;
                }
                var response = responseUtility.makeResponse(false,null,"Supplied parameters are not valid",400);
                return response;
            }, (error)=>{
                if(error.name === 'ValidationError'){
                    return Promise.join(responseUtility.makeResponse(false,null,responseUtility.validationError(error),400));                    
                }
                return Promise.join(responseUtility.makeResponse(false,null,error,400));
            });
        }
        catch(error){
            return Promise.join(responseUtility.makeResponse(false,null,error,400));
        }
    },

    signin:(options) => {
        return Employee.getEmployeeByEmailAndPassword(options['email'], options['password']).then((result)=>{
            if (result == null) {
                var response = responseUtility.makeResponse(false,null,"invalid email or password",401);
                return response;
            }
            
            var payload = {
                email: result.email,
                type: result.userType
            }
            var response = responseUtility.makeResponse(true,{"token": authentication.jwtAuthentication.generate(payload)},
                null,null);
            return response;
        }, (error)=>{
            return Promise.join(responseUtility.makeResponse(false,null,error,400));
        });
    },

    search:(options) =>{
        var searchType = options['searchType'];
        })
    },

    detail:(options) => {
        return Employee.getUserById(options['userId']).then((result)=>{
            var response;
            if (result == null) {
                response = responseUtility.makeResponse(false,null,"Employee Not Exist.",401);
                return response;
            }

                response = responseUtility.makeResponse(true,userObj,"",202);
                return response;
        })
    }
};

module.exports = {employee};
