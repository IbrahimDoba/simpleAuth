"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const User = require("../schema/userModel");
const express = require("express");
const { Router } = express;
const { verify } = require("jsonwebtoken");
var nodemailer = require('nodemailer');
// const { Request, Response, response } = express;
const router = Router();
const { createTokens, validateToken } = require("../auth/JWT");
// const cookieParser = require ("cookie-parser")
// AUTH ROUTES
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    const user = yield User.findOne({ email: email });
    // console.log(user)
    if (!user) {
        res.status(400).json({ message: "user does not exist" });
        return;
    }
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({ error: "Incorrect Username or Password" });
            res.json({ message: "no user exists", auth: false });
        }
        else {
            const accessToken = createTokens(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                withCredentials: true,
                httpOnly: true, // for security to prevent others from accessing your cookies
            });
            res.json({ message: "logged In", auth: true, accessToken, email: email });
            next();
        }
    });
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPass = req.body.confirmPass;
    console.log(email, password, confirmPass);
    // Case 1: Check if password is not up to 8 characters
    if (password.length < 8) {
        res.status(400).json("Password should be at least 8 characters long");
        return;
    }
    // Case 2: Check if password does not contain a number
    if (!/\d/.test(password)) {
        res.status(400).json("Password must contain at least one number");
        return;
    }
    // Check if passwords match
    if (password !== confirmPass) {
        res.status(400).json("Password does not match Confirm Password");
        return;
    }
    // check if user is existing
    const existingUser = yield User.findOne({ email: email });
    if (existingUser) {
        // If user already exists, return a duplicate user error
        res
            .status(400)
            .json({ status: "error", error: "User with this email already exists" });
        return;
    }
    try {
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                email: email,
                password: hash,
            });
            console.log("Hashed Password:", hash);
        });
        res.json({ message: "Registed Successfully", sucess: true, User });
    }
    catch (error) {
        console.log(error);
    }
});
const isAuthController = (req, res, next) => {
    res.json("authenticated");
};
const forgotPassword = (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.send({ status: "User does not exist" });
        }
        const resetToken = createTokens(user);
        res.cookie("reset-token", resetToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true, // for security to prevent others from accessing your cookies
        });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        var mailOptions = {
            from: 'Onesilver55@gmail.com',
            to: 'ibrahimdoba55@gmail.com',
            subject: 'Reset your password',
            text: `http://localhost:3000/reset-password/${user._id}/${resetToken}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                return res.send({ status: "Success" });
            }
        });
    });
};
module.exports = {
    login,
    signup,
    isAuthController,
    forgotPassword,
};
