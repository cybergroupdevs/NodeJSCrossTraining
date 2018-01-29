const { appConfigKeys } = require('./../../appconfig/appconfig');
const jwt = require('jsonwebtoken');

var jwtAuthentication =
    {
        verify: (req, res, next) => {
            var token = req.headers["token"];
            if (token) {
                jwt.verify(token, appConfigKeys.jwt_secret_key, (err, token) => {
                    if (err) {
                        res.send({ errorMessage: "error: invalid token" });
                    }
                    else {
                        req.user = token;
                        next();
                    }
                });
            }
            else {
                res.status(403).send({
                    errorMessage: "error: invalid token"
                })
            }
        },
        generate: (payload) => {
            return jwt.sign(payload, appConfigKeys.jwt_secret_key, { expiresIn: appConfigKeys.jwt_token_expirationTime });
        }
    };

module.exports = { jwtAuthentication };