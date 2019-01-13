var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config/keys');

exports.login = function (req, res) {
    var post = req.body;
    User.findOne({ email: post.email.toLowerCase(), password: post.password, isDeleted:false }, { _id: 1, email: 1, firstName:1,lastName:1,isDeleted:1, status:1 }, function (err, users) {
        if (err) {
            throw err;
        } else {
            if (users) {
                if (users.status == 1) {
                    var token = jwt.sign(users.toJSON(), config.secret);
                    res.json({ status: 200, message: 'You have logged in successfully', data: users, token: token });
                } else {
                    res.json({ status: 201, message: 'Sorry! your account has been deleted.' });
                }
            } else {
                res.json({ status: 201, message: 'Username or password is not valid' });
            }
        }
    });
}



exports.register = function (req, res) {
    var post = req.body;
    var d = new Date();
    req.checkBody('firstName', "Please enter first name.").notEmpty();
    req.checkBody('lastName', "Please enter last name.").notEmpty();
    req.checkBody('password', "Password should be 6-20 Characters long").isLength(6, 20);
    req.checkBody('email', "Please enter a valid email address.").isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.json({ status: "202", message: errors[0].msg });
    } else {
        var userdata = {
            firstName:post.firstName,
            lastName:post.lastName,
            password: post.password,
            email: post.email.toLowerCase(),
        };
        User.findOne( {email: post.email.toLowerCase() }, function (err, users) {
            if (err) {
                throw err;
            } else {
                if (users) {
                    if (users.email == post.email) {
                        res.json({ status: 201, message: 'Email already registered.' });
                    }
                } else {
                    var recordData = new User(userdata);
                    // call the built-in save method to save to the database
                    recordData.save(function (err, usersdata) {
                        if (err){
                            console.log('in error',err)
                            res.json({ status: 201, message: err });                            
                        }else{
                            res.json({ status: 200, message: 'Successfully registered!' });                                                    
                    }

                    });
                }
            }
        });

    }


}

exports.getUserById = function(req, res) {
        User.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                res.json({ status: 201, messages: err });
            } else {
                res.json({ status: 200, message: "User has been fetched successfully", data: user });
            }
        });

    }


