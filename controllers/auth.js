const bcrypt = require("bcryptjs");
const { connectDB } = require('../model/db');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { users } = require('../model/db.schema')

exports.register = async (req, res) => {

    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

    const { name, email, password, passwordConfirm } = req.body;
    const result = await users.findOne({ email: email });
    if (result) {
        return res.render("register.hbs", {
            message: "this Email Account Alredy",
        });
    }
    else if (!name || !email || !password || !passwordConfirm) {
        return res.render('register.hbs', {
            message: 'Fill All Detail'
        })
    }
    else if (password != passwordConfirm) {
        return res.render("register.hbs", {
            message: "Password Dose Not Mach",
        });
    }
    else {
        const harsedPassword = await bcrypt.hash(password, 8);
        console.log(harsedPassword);
        const addUser = new users({
            name: name,
            email: email,
            password: harsedPassword
        })
        const add=await addUser.save();
        if(add){
        const id = add._id;
        console.log(id);
        const token = jwt.sign({ id }, 'vijay', {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        const cookiesOptions = {
            expires: new Date(Date.now() + (60)),
            httpOnly: true

        };
        res.cookie('jwt', token, cookiesOptions)

        return res.render("register.hbs", {
            message: "Application Submited",
        });
    }
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.render("login.hbs", {
                message: 'Please provide email and password'
            });
        }
        //  2) Check if user exists && password is correct

        else {
            const findUser=await users.findOne({email:email});
            console.log('................')
            console.log(findUser)
            const isMatch = bcrypt.compareSync(password, findUser.password);
            console.log(isMatch);

            if(findUser && isMatch)
            {
                if (!findUser.email || !isMatch) {
                return res.render('login.hbs', {
                    message: 'Increct Passworld',
                });
            }
            else if (findUser.email && isMatch) {
                const id =findUser._id;
                const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
                    expiresIn: '10m'
                })
                const cookiesOptions = {
                    // expires: new Date(Date.now()+(60)),
                    maxAge: new Date(Date.now() + 1000 * 60),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions)
                res.redirect('/data_page');
            }
        }
            else {
                res.redirect('/login');
            }
        }
    }
    catch (err) {

        console.log('err ')
    }
}


exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.log('token expires')
        } else {
            jwt.verify(token, process.env.JWT_TOKEN)
            next();
        }

    } catch (err) {
        console.log('some err occure')
        res.redirect('/login')
    }
};
