const mongoose = require('mongoose');
const responseUtility = require('./../utility/response').response;
const crypto = require('./../utility/response').encrypt_decrypt;
const Employee = require('./../models/employee').Employee; //model class
const authentication = require('./../middleware/authentication/authentication.middleware');
const Promise = require('bluebird');
const { appConfigKeys } = require('./../appconfig/appconfig');

var employee = {
    register: (options) => {
        try {
            if (((options["employeeCode"].toString()).trim()).length == 0) {
                return Promise.join(responseUtility.makeResponse(false, null, 'EmployeeCode can not be blank', null));
            }
            if (options['password'] === undefined || !options['password'])
                return Promise.join(responseUtility.makeResponse(false, null, "required password is missing", null));
            var password = options['password'];
            var userObj = { 'userType': "USER" }; // Initializing userObj with userType as 'USER'
            if (options['employeeCode'])
                userObj.employeeCode = options['employeeCode'].trim();
            if (options['emailAddress']) {
                userObj.emailAddress = options['emailAddress'].trim();
            }
            if (options['role']) {
                userObj.role = options['role'];
            }
            userObj.password = password
            var passwordSalt = crypto.createSalt(16);
            userObj.passwordHash = crypto.encrypt(password, passwordSalt);
            userObj.passwordSalt = passwordSalt;
            if (options['firstName']) {
                userObj.firstName = options['firstName'];
            }
            else {
                userObj.firstName = options['userName'].trim();
            }
            if (options['middleName']) {
                userObj.middleName = options['middleName'];
            } else {
                userObj.middleName = ""
            }
            if (options['lastName']) {
                userObj.lastName = options['lastName'];
            } else {
                userObj.lastName = ""
            }
            if (options['gender']) {
                userObj.gender = options['gender'];
            }
            if (options['bio']) {
                userObj.bio = options['bio'];
            }
            if (options['address']) {
                userObj.address = options['address'];
            }
            if (options['userType']) {
                userObj.userType = options['userType'];
            }
            if (options['location']) {
                userObj.location = options['location'];
            }
            if (options['mobileNumber']) {
                userObj.mobileNumber = options['mobileNumber'];
            }
            if (options['city']) {
                userObj.city = options['city'];
            }
            if (options['country']) {
                userObj.country = options['country'];
            }
            if (options['state']) {
                userObj.state = options['state'];
            }
            if (options['country']) {
                userObj.country = options['country'];
            }
            if (options['dateOfBirth']) {
                userObj.dateOfBirth = new Date(options['dateOfBirth']);
            }

            userObj['displayName'] = userObj['firstName'] + (userObj['middleName'] ? (" " + userObj['middleName']) : "") + (userObj['lastName'] ? (" " + userObj['lastName']) : "")
            userObj['isBlockedByAdmin'] = false;
            if (options['skills']) {
                var technicalSkills = options['skills']
                if (!Array.isArray(technicalSkills)) {
                    technicalSkills = options['skills'].split(',');
                }
                userObj['skills'] = technicalSkills;
            }
            return Employee.saveEmployeeToDatabase(userObj).then((result) => {
                if (result) {
                    result = employee.responseDetail(result);  //only taking required fields 
                    var response = responseUtility.makeResponse(true, { employee: result }, null, null);
                    return response;
                }
                var response = responseUtility.makeResponse(false, null, "Supplied parameters are not valid", 400);
                return response;
            }, (error) => {
                if (error.name === 'ValidationError') {
                    return Promise.join(responseUtility.makeResponse(false, null, responseUtility.validationError(error), 400));
                }
                if (error && error.code === 11000) {
                    return Promise.join(responseUtility.makeResponse(false, null, "Employee with same emailAddress or employeecode is already exists", 400));
                }
                return Promise.join(responseUtility.makeResponse(false, null, error, 400));
            });
        }
        catch (error) {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        }
    },

    signin: (options) => {
        return Employee.getEmployeeByEmail(options['emailAddress']).then((userObj) => {

            console.log('############# userObje ####### and password', userObj, options['password']);

            if (userObj == null || (!userObj.validatePassword(options['password'], userObj.passwordHash, userObj.passwordSalt))) {
                var response = responseUtility.makeResponse(false, null, "invalid email or password", 401);
                return response;
            }
            var payload = {
                emailAddress: userObj.emailAddress,
                userType: userObj.userType,
                userId: userObj._id
            }
            userObj = employee.responseDetail(userObj);  //only taking required fields 
            var response = responseUtility.makeResponse(true, { employee: userObj, "token": authentication.jwtAuthentication.generate(payload) },
                null, null);
            return response;
        }, (error) => {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        });
    },

    search: (options) => {
        var searchType = options['searchType'];
    },

    detail: (options, userObj) => {
        if (!options['userId']) {
            options['userId'] = userObj.userId; // current user details
            // return Promise.join(responseUtility.makeResponse(false,null,"User id is missing", null));  
        }
        return Employee.getUserById(options['userId']).then((result) => {
            var response;
            if (result == null) {
                response = responseUtility.makeResponse(false, null, "Employee Not Exist.", 401);
                return response;
            }
            result = employee.responseDetail(result);  //only taking required fields 
            response = responseUtility.makeResponse(true, result, "", 202);
            return response;
        }, (error) => {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        });
    },

    employeeList: (options) => {
        //Handling page number
        var pageNo = options['pageNo'];
        if (!pageNo || pageNo <= 0) {
            return Promise.join(responseUtility.makeResponse(false, null, "Page no should not be empty or 0", null));
        }
        if (isNaN(pageNo)) {
            return Promise.join(responseUtility.makeResponse(false, null, "Page number shound be a numeric", null));
        }
        pageNo = parseInt(pageNo);

        //Handling page limit
        var limit = options['limit'];
        if (!limit) {
            limit = appConfigKeys.pageLimit; //using default page limit from config
        } else if (limit <= 0) {
            return Promise.join(responseUtility.makeResponse(false, null, "Limit should not be 0", null));
        } else if (isNaN(limit)) {
            return Promise.join(responseUtility.makeResponse(false, null, "Limit shound be a numeric", null));
        }
        limit = parseInt(limit);

        return Employee.getEmployeeList(pageNo, limit,
            options['skills'], options['gender'],
            options['searchkey'], options['sortkey'], options['sortorder']).then((result) => {
                if (!result) {
                    var response = responseUtility.makeResponse(false, null, "Invalid request", 401);
                    return response;
                }

                var response = responseUtility.makeResponse(true, result, "List returned", null);
                return response;
            }, (error) => {
                return Promise.join(responseUtility.makeResponse(false, null, error, 400));
            });
    },

    deleteUser: (options, userObj) => {
        if (userObj.userType === "USER") {
            return Promise.join(responseUtility.makeResponse(false, null, "you can't process this request please contact to admin", 400));
        }
        else {
            return Employee.deleteEmployeeFromDatabase(options['userId']).then((result) => {
                if (result) {
                    var response = responseUtility.makeResponse(true, { employee: result }, null, null);
                    return response;
                }
                else {
                    var response = responseUtility.makeResponse(false, null, "user with this user id doesn't exist", 400);
                    return response;
                }
            }, (error) => {
                console.log(error);
                return Promise.join(responseUtility.makeResponse(false, null, error, 400));
            })
        }
    },


    updateUser: (options, userObj) => {
        //if we are getting user id as param
        
        if (options['userId']) {
            //check if user Id match with login user 
            if (userObj.userId !== options['userId']) {
                //check  user have admin rights 
                if (userObj.userType === "USER") {
                    return Promise.join(responseUtility.makeResponse(false, null, "you can't process this request please contact to admin", 400));
                }
            }
        }
        else {
            // set Id to login user id
            options['userId'] = userObj.userId;
        }
        return Employee.getUserById(options['userId']).then((result) => {
            var response;
            var user;
            if (result == null) {
                response = responseUtility.makeResponse(false, null, "Employee Not Exist.", 401);
                return response;
            }
            
            user = result;

            //start update

            if (options['firstName']) {
                user.firstName = options['firstName'];
            }
            
            if (options['middleName'] !== null && options['middleName'] !== undefined) {
                user.middleName = options['middleName'];
            }
            if (options['lastName']) {
                user.lastName = options['lastName'];
            }
            if (options['gender']) {
                user.gender = options['gender'];
            }
            if (options['address']) {
                user.address = options['address'];
            }

            if (options['mobileNumber']) {
                user.mobileNumber = options['mobileNumber'];
            }
            if (options['city']) {
                user.city = options['city'];
            }
            if (options['country']) {
                user.country = options['country'];
            }
            if (options['state']) {
                user.state = options['state'];
            }
            if (options['zipCode']) {
                user.state = options['zipCode'];
            }

            if (options['bio']) {
                user.bio = options['bio'];
            }
            // if (options['dateOfBirth']) {
            //     user.dateOfBirth = options['dateOfBirth'];
            // }
            user.displayName = user['firstName'] + (user['middleName'] ? (" " + user['middleName']) : "") + (user['lastName'] ? (" " + user['lastName']) : "")
            
            //end update 
            return Employee.updateEmployeeDatabase(user).then((result1) => {
                if (!result1) {
                    response = responseUtility.makeResponse(false, null, "Unable to update user", 401);
                    return response;
                }
                result1 = employee.responseDetail(result1);  //only taking required fields 
                response = responseUtility.makeResponse(true, result1, null, null);
                return response;
            }, (error) => {
                return Promise.join(responseUtility.makeResponse(false, null, error, 400));
            });


        }, (error) => {
            return Promise.join(responseUtility.makeResponse(false, null, error, 400));
        });

    },

    responseDetail: (userObj) => {
        if (userObj) {
            var response = {
                "firstName": userObj.firstName,
                "middleName": userObj.middleName,
                "lastName": userObj.lastName,
                "displayName": userObj.displayName,
                "mobileNumber": userObj.mobileNumber,
                "dateOfBirth": userObj.dateOfBirth,
                "gender": userObj.gender,
                "address": userObj.address,
                "city": userObj.city,
                "country": userObj.country,
                "state": userObj.state,
                "zipCode": userObj.zipCode,
                "isActive": userObj.isActive,
                "isDelete": userObj.isDelete,
                "isBlockedByAdmin": userObj.isBlockedByAdmin,
                "userType": userObj.userType,
                "bio": userObj.bio,
                "tags": userObj.tags,
                "skills": userObj.skills,
                "createdAt": userObj.createdAt,
                "updatedAt": userObj.updatedAt,
                "_id": userObj._id,
                "employeeCode": userObj.employeeCode,
                "emailAddress": userObj.emailAddress,
                "location": userObj.location
            }
            return response;
        } else {
            return null;
        }
    }
};

module.exports = { employee };
