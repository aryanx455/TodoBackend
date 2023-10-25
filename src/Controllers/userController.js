const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Otp } = require("../Models/otpModel");

exports.signUp = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate)
        return res.status(409).json({ message: "User already exists" });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
        });
        const result = await newUser.save();
        res.json({ message: "User created successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const result = await User.findOne({ email: email }).exec();
        console.log(result);
        if (!result)
            return res.status(401).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, result.password);
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" });
        const TOKEN_SECRET = process.env.TOKEN_SECRET;
        const token = jwt.sign(
            {
                email: email,
                firstname: result.firstname,
                lastname: result.lastname,
            },
            TOKEN_SECRET
        );
        res.json({ message: "Login successful", token ,email,firstname:result.firstname,lastname:result.lastname});
    } catch (err) {
        return res.status(500).json({ message: "invalid" });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.body;
    const { prevPassword, newPassword } = req.body;
    if (!prevPassword || !newPassword) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    if (prevPassword === newPassword) {
        res.status(400).json({
            message: "New password cannot be same as old password",
        });
    }
    const userData = await jwt.verify(token, process.env.TOKEN_SECRET);
    const OTP = Math.floor(100000 + Math.random() * 900000);

    //send a automated mail using nodemailer
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "ChangePasswordApplication455@hotmail.com",
            pass: "changePassword!@#123",
        },
    });
    //2) Define the email options
    const mailOptions = {
        from: "ChangePasswordApplication455@hotmail.com",
        to: userData.email,
        subject: "One time key for changing password",
        text: "Here is a OTP for you to change your password : " + OTP,
    };

    transporter.sendMail(mailOptions, async function (err, data) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const hashOtp = await bcrypt.hash(OTP.toString(), 10);
            const newOtp = await new Otp({
                email: userData.email,
                otp: hashOtp,
            });
            await newOtp.save();
            res.status(200).json({ message: "OTP sent successfully" });
        }
    });
};
exports.verifyOtp = async (req, res) => {
    const { token,otp,newPassword } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    const otpData = await Otp.findOne({ email: userData.email }).exec();
    if (!otpData) return res.status(401).json({ message: "Timeout" });
    console.log(otpData);
    const match = await bcrypt.compare(otp, otpData.otp);
    if (!match)
        return res.status(401).json({ message: "Invalid credentials-2" });
    const newHashedPass = await bcrypt.hash(newPassword, 10);
    await Otp.deleteOne({ email: userData.email }).exec();
    await User.findOneAndUpdate(
        { email: userData.email },
        { password: newHashedPass}
    ).exec();
    res.json({ message: "Password changed successfully" });
};
