const mongoose  = require('mongoose');
const responseUtility = require('./../utility/response').response;
const Employee = require('./../models/employee').Employee; //model class
const authentication = require('./../middleware/authentication/authentication.middleware');

var employee = {
    register:(options)=> {
        try{
            if(((options["userName"].toString()).trim()).indexOf(' ') >= 0){
                return responseUtility.makeResponse(false,null,"userName can not have space", null); 
            }
            if (options['password'] === undefined)
                return responseUtility.makeResponse(false,null,"required password is missing", null);  
            var password = options['password'];
            var userObj = { 'userType': "USER" }; // Initializing userObj with userType as 'USER'
            if (options['userName'])
                userObj.userName    = options['userName'].trim();
            if (options['emailAddress']){
                userObj.emailAddress = options['emailAddress'].trim();
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

                // var result = Employee.saveEmployeeToDatabase(userObj); 
                if(result){
                    var response = responseUtility.makeResponse(true,{employee:result},null,null);
                    return response;
                }
                var response = responseUtility.makeResponse(false,null,"Supplied parameters are not valid" + error,400);
                return response;
            })
        }
        catch(error){
            var response = responseUtility.makeResponse(false,null,"Supplied parameters are not valid" + error,400);
            return response;
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
        })
    }
};

module.exports = {employee};