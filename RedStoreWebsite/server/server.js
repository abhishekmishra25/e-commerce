const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./model/user')
const bcrypt = require('bcrypt')


mongoose.connect('mongodb://localhost:27017/logindata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'static')))

app.post('/api/register', async (req, res) => {

    const { username, password: plainpassword } = req.body

    const password = await bcrypt.hashSync(plainpassword, 10)

    try {
        const response = await user.create({
            username,
            password
        })

        console.log("user created successfully", response)
    }
    catch (error) {
        if (error.code === 11000) {
            res.send({ status: error, error: ' username already exist' })
        }
        throw error

    }
    res.send({ status: 'ok' })

})



app.post('/api/login', async (req, res) => {

    const { username, password } = req.body

    const user1 = await user.findOne({ username }).lean()
    if (!user1) {
        return res.json({ status: "error", error: "INVALID USER" })
    }

    if (await bcrypt.compare(password, user1.password)) {

        // res.redirect(path.join(__dirname, 'static/index.html'))

    }
    else {
        alert("invalid user")
    }
    res.json({ status: 'ok' })
})
const speakeasy = require("speakeasy")
const qrcode = require("qrcode")

const cors = require("cors");

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