const crypto = require('crypto')

var response, encrypt_decrypt;

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
    },
    
    validationError:(err) =>{
        message = []
        if (err) {
            for (field in err.errors) {
                message.push(err.errors[field].message);
            }
        }
        return message[0]
    }
};

encrypt_decrypt = {
    randomString:function(length, chars) {
        if(!chars){
            chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },
    createSalt:function (length) {
        var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(!length)
        {
            length=16;
        }
        var result = '';
        var salt='';
        //for (var i = 32; i > 0; --i) {result += chars[Math.round(Math.random() * (chars.length - 1))]};
        for (var i = 32; i > 0; --i) {salt += chars[Math.round(Math.random() * (chars.length - 1))]};
            var cipher=crypto.createCipher('aes-256-cbc-hmac-sha1',salt);
        var crypted=cipher.update(result,'utf8','base64');
        crypted +=cipher.final('base64');
        return (crypted).substr(0,length);
    },
    encrypt:function(text,salt){
      var hash= crypto.createHmac('sha256',salt).update(text).digest("base64");
      return hash;
    }
};

module.exports = {response,encrypt_decrypt};