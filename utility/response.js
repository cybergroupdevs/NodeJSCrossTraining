var response;

response = {
    /**
   * Response object structure.
   * @param status boolean value, will return status of request(pass/fail)
   * @param data result in form of JSON object
   * @param message String, message to client in case of failure
   * @param statusCode Number, custom code
   */

    makeResponse:(status,data,message,statusCode) =>{
        var result = {
            status:status,
            data: data,
            mesage : message ? message : null,
            statusCode : statusCode ? statusCode : null
        };
        return result;
    }
};

module.exports = {response};