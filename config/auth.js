var jwt = require('jsonwebtoken');
var keys = require('./keys');
exports.isAuthenticated = function(req, res, next) {
    if (req.headers['authorization']) {
        var token = req.headers['authorization'];
        token = token.split('Bearer');
        token = token[1];
        var str = token.replace(/\s/g, '');
        try {
            var decoded = jwt.verify(str, keys.secret);
            req.user = decoded;
            next();
        } catch (err) {
            res.json({
                'message': 'Unauthorized'
            });
        }
    } else {
        res.json({
            'message': 'Unauthorized'
        });
    }
}