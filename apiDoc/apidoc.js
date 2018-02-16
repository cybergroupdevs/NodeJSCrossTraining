/**
* @api {POST} /register /register 
* @apiName Registration
* @apiGroup Employee
*
* @apiParam {String} emailAddress Email Address.
* @apiParam {String} firstName First Name.
* @apiParam {String} middleName Middle Name.
* @apiParam {String} employeeCode  Employee Code.
* @apiParam {String} mobileNumber  Mobile Number.
* @apiParam {Date} dateOfBirth  Date Of Birth.
* @apiParam {String} gender  Gender(M/F).
* @apiParam {String} location  Location.
* @apiParam {String} address  Address.
* @apiParam {String} city  City.
* @apiParam {String} country  Country.
* @apiParam {String} userType  User Role (ADMIN/USER Default = USER).
* @apiParam {String} password  Password.
* @apiParam {Array} skills  Array of Skills.
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*{
    "status": true,
    "data": {
        "employee": {
            "firstName": "Test",
            "middleName": "-",
            "lastName": "Cyber",
            "displayName": "Test - Cyber",
            "mobileNumber": "999999999",
            "dateOfBirth": "1987-12-06T18:30:00.000Z",
            "gender": "F",
            "address": "Noida Sector - 03",
            "city": "Noida",
            "country": "India",
            "state": "Ghaziabad",
            "zipCode": "",
            "isActive": true,
            "isDelete": false,
            "isBlockedByAdmin": false,
            "userType": "USER",
            "bio": "",
            "tags": [],
            "skills": [
                "Objective-C",
                "C++",
                "ROR"
            ],
            "createdAt": "2018-02-14T07:50:55.661Z",
            "updatedAt": "2018-02-14T07:50:55.661Z",
            "_id": "5a83ea5fe81b131863494a28",
            "employeeCode": "CGI-000",
            "emailAddress": "testuser@cygrp.com",
            "location": "Noida",
        }
    },
    "mesage": null,
    "statusCode": null
}
*/

/**
* @api {POST} /login /login 
* @apiName Login
* @apiGroup Employee
*
* @apiParam {String} emailAddress Email Address.
* @apiParam {String} password  Password.
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*{
    "status": true,
    "data": {
        "employee": {
            "firstName": "Test",
            "middleName": "-",
            "lastName": "Cyber",
            "displayName": "Test - Cyber",
            "mobileNumber": "999999999",
            "dateOfBirth": "1987-12-06T18:30:00.000Z",
            "gender": "F",
            "address": "Noida Sector - 03",
            "city": "Noida",
            "country": "India",
            "state": "Ghaziabad",
            "zipCode": "",
            "isActive": true,
            "isDelete": false,
            "isBlockedByAdmin": false,
            "userType": "USER",
            "bio": "",
            "tags": [],
            "skills": [
                "Objective-C",
                "C++",
                "ROR"
            ],
            "createdAt": "2018-02-14T07:50:55.661Z",
            "updatedAt": "2018-02-14T07:50:55.661Z",
            "_id": "5a83ea5fe81b131863494a28",
            "employeeCode": "CGI-000",
            "emailAddress": "testuser@cygrp.com",
            "location": "Noida",
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGN5Z3JwLmNvbSIsInR5cGUiOiJVU0VSIiwidXNlcklkIjoiNWE4M2VhNWZlODFiMTMxODYzNDk0YTI4IiwiaWF0IjoxNTE4NTk0ODMzLCJleHAiOjE1MTg2MDA4MzN9.fx_KrZoxrrLTnC8bVFtChhhHgQ_MLMNQrxJA_dC2EKM"
    },
    "mesage": null,
    "statusCode": null
}
*/

/**
* @api {GET} /userdetail /userdetail 
* @apiName Employee Details
* @apiGroup Employee
*
* @apiParam {String} userId User Id (If not available will return current employee details).
* @apiParam {String} token  Token.
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*{
    "status": true,
    "data": {
        "firstName": "Test",
        "middleName": "-",
        "lastName": "Cyber",
        "displayName": "Test - Cyber",
        "mobileNumber": "999999999",
        "dateOfBirth": "1987-12-06T18:30:00.000Z",
        "gender": "F",
        "address": "Noida Sector - 03",
        "city": "Noida",
        "country": "India",
        "state": "Ghaziabad",
        "zipCode": "",
        "isActive": true,
        "isDelete": false,
        "isBlockedByAdmin": false,
        "userType": "USER",
        "bio": "",
        "tags": [],
        "skills": [
            "Objective-C",
            "C++",
            "ROR"
        ],
        "createdAt": "2018-02-14T07:50:55.661Z",
        "updatedAt": "2018-02-14T07:50:55.661Z",
        "_id": "5a83ea5fe81b131863494a28",
        "employeeCode": "CGI-000",
        "emailAddress": "testuser@cygrp.com",
        "location": "Noida",
    },
    "mesage": null,
    "statusCode": null
}
*/

/**
* @api {GET} /employeelist /employeeList 
* @apiName List of Employees
* @apiGroup Employee
*
* @apiParam {Number} limit limit the number of rows.
* @apiParam {Number} pageNo  Page Number.
* @apiParam {String} filter Skills comma separated(skills=nodejs,mongo).
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*{
    "status": true,
    "data": [
        {
            "displayName": "Nitesh Gautam",
            "gender": "M",
            "skills": [],
            "_id": "5a83fadcb2fe890014772a01",
            "employeeCode": "CGI-167",
            "emailAddress": "nitesh.gautam@cygrp.com"
        },
        {
            "displayName": "Aman Sharma",
            "gender": "M",
            "skills": [
                "java",
                "android",
                "nodejs",
                "mongo"
            ],
            "_id": "5a8402adafe15569480adb7d",
            "employeeCode": "CGI-230",
            "emailAddress": "aman.sharma@cygrp.com"
        },
        {
            "displayName": "aashish issar",
            "gender": "M",
            "skills": [],
            "_id": "5a85427157b48005e4238445",
            "employeeCode": "CGI-250",
            "emailAddress": "aashish.issar@cygrp.com"
        },
        {
            "displayName": "Vijay Masiwal",
            "gender": "M",
            "skills": [],
            "_id": "5a8670be9c90f23dd8757b4e",
            "employeeCode": "CGI-241",
            "emailAddress": "vijay.masiwal@cygrp.com"
        }
    ],
    "mesage": "List returned",
    "statusCode": null
}
*/

/**
* @api {DELETE} /deleteEmployee /deleteEmployee 
* @apiName Delete Employee
* @apiGroup Employee
*
* @apiParam {String} userId USER ID.
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*{
    "status": true,
    "data": {
    },
    "mesage": null,
    "statusCode": null
}
*/

/**
 * @api {POST} /addskill /addskill
 * @apiName Add Skill
 * @apiGroup Skill
 * 
 * @apiParam {String} name SKILL NAME handling case sensitive
 * @apiParam {String} type SKILL TYPE {Default : TECHNICAL}
 * @apiParam {String} token  Token in header
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": true,
    "data": {
        "type": "technical",
        "_id": "5a866dacefab0f0014c71591",
        "name": "NODE JS",
        "__v": 0
    },
    "mesage": "Skill added successfully",
    "statusCode": null
}
 */

 /**
 * @api {GET} /listskill /listskill
 * @apiName List Skill
 * @apiGroup Skill
 * 
 * @apiParam {String} token  Token in header
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": true,
    "data": [
        {
            "type": "Framework",
            "_id": "5a853ad470a6655678ed614d",
            "name": "ANDROID",
            "__v": 0
        },
        {
            "type": "technical",
            "_id": "5a866dacefab0f0014c71591",
            "name": "NODE JS",
            "__v": 0
        }
    ],
    "mesage": "Skill list returned",
    "statusCode": null
}
 */