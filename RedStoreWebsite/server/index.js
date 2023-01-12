const speakeasy = require("speakeasy")
const qrcode = require("qrcode")
const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

app.get('/api/qr', function (req, res) {

    var secret = speakeasy.generateSecret({
        name: 'WeAreE-contact'
    })

    qrcode.toDataURL(secret.otpauth_url, function (err, data) {

        if (err) {
            return res.status(200).json({
                status: false,
                rq: data,
                msg: err,
                data: []
            })
        }

        return res.status(200).json({
            status: true,
            rq: data,
            msg: 'success',
            data: secret
        })
    })

});

app.post('/api/verify', function (req, res) {

    let secret = req.body.secret;
    let encoding = req.body.encoding;
    let token = req.body.token;

    var verified = speakeasy.totp.verify({
        secret: secret,
        encoding: encoding,
        token: token
    })

    return res.status(200).json({
        verified: verified
    })

});



var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Running on the server http://%s:%s', host, port);
});



