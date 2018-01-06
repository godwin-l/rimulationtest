
'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');


var transport = nodemailer.createTransport({
        //service: 'Gmail', // use well known service.
                            // If you are using @gmail.com address, then you don't
                            // even have to define the service name
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "j.vinoth@virtualgodown.com",
            pass: "1206v!noth"
        }
    });



exports.readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

exports.transport = transport;
