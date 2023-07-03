// const bcrypt = require("bcrypt");
// const User = require("../model/User");
// const jwt = require("jsonwebtoken");
// require("dotenv").config()

// //signup route handler
// exports.signup = async (req, res) => {
//     try {
//         //get the input data
//         const { name, email, pass, roll } = req.body;
//         //check if the user already exists
//         const existing_user = await User.find({ email });
//         if (existing_user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User already Exists',

//             });
//         }
//         //secure password
//         let hashedPassword;
//         try {
//             hashedPassword = await bcrypt.hash(password, 10);
//         }
//         catch {
//             return res.status(300).json({
//                 success: false,
//                 message: "Failed hashing "
//             });
//         }
//         //create entry for user
//         const user = await User.create({
//             name, email, password: hashedPassword, role
//             //user entry in db successfully


//         })
//         return res.status(200).json({
//             success: true,
//             message: 'User Created Successfully'
//         })
//     }
//     catch (error) {
//         console.error(error);
//         return res.status(200).json({
//             success: true,
//             message: 'User Created Successfully',
//         });
//     }

// }

// //login
// exports.login = async (req, res) => {
//     try {
//         //data fetch
//         const { email, password } = req.body;
//         //validation on email and password
//         if (!email || !password)
//             return res.status(400).json({
//                 succcess: false,
//                 message: 'Please fill all the details carefully',
//             });
//         //check if registered user
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User is not registered'
//             })
//         }

//         const payload = {
//             email: user.email,
//             id: user._id,
//             role: user.role,
//         }
//         //verify password and generate a jwt token
//         if (await bcrypt.compare(password, user.password)) {
//             //pasword match
//             let token = jwt.sign(payload,
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn: "2h"
//                 });

//             user.token = token;
//             user.password = undefined;
//             const options = {
//                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly: true,

//             }

//             res.cookie("token", token, options).status(200).json({
//                 succcess: true,
//                 token,
//                 user,
//                 message: 'User Logged in successfully',

//             })
//         }
//         else {
//             //password do not match
//             return res.status(403).json({
//                 succcess: false,
//                 message: 'Password incorrect'
//             });
//         }
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             succcess: false,
//             message: 'Login Failure'
//         })

//     }
// }

const bcrypt = require("bcrypt");
const User = require("../model/User");

exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, passowrd, role } = req.body;
        //check if user alreadu exists
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: 'User already exists'
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await brycpt.hash(passowrd, 10);
        }
        catch (err) {
            
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });

            
        }
        //Create entry for user
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered , please try again later'
        });
    }
}


