const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
var exist = new Boolean(false);


router.get('/', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const users = JSON.parse(data);
            res.status(200).json(users)
        }
    });
})

router.post('/create', (req, res, next) => {
    exist = false;
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const users = JSON.parse(data);
            users.forEach(element => {
                if (element.email == req.body.email) {
                    exist = true;
                    return res.status(409).json({
                        message: 'The user with this email already exists!'
                    });
                }
            });
            if (exist == false) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        if (validateEmail(req.body.email)) {
                            const user = { email: req.body.email, password: hash };
                            fs.readFile('./users.json', 'utf8', (err, data) => {

                                if (err) {
                                    console.log(`Error reading file from disk: ${err}`);
                                } else {

                                    const databases = JSON.parse(data);
                                    databases.push(user);

                                    fs.writeFile('./users.json', JSON.stringify(databases, null, 4), (err) => {
                                        if (err) {
                                            console.log('Error: couldn`t create a user');
                                            res.status(500).json({
                                                message: 'Couldn`t create a user :('
                                            })
                                        } else {
                                            console.log('User created');
                                            res.status(201).json({
                                                message: 'User was successfully created :)'
                                            })
                                        }
                                    });
                                }

                            });
                        } else {
                            res.status(500).json({
                                message: 'Incorrect format of email'
                            })
                        }
                    }
                })
            }
        }
    });
});

router.post('/login', (req, res, next) => {
    exist = false;
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const users = JSON.parse(data);
            users.forEach(element => {
                if (element.email == req.body.email) {
                    exist = true;
                    bcrypt.compare(req.body.password, element.password, (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Auth failed'
                            });
                        }
                        if (result) {
                            const token = jwt.sign(
                                {email: element.email},
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                }
                            );
                            return res.status(200).json({
                                message: 'Auth successful',
                                token: token
                            });
                        }
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    });
                }
            });
        }
        if (exist == false) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    });
});

router.delete('/userEmail', (req, res, next) => {
    res.status(200).json()
})


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router;