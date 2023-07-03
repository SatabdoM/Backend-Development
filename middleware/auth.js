//auth isStudent //isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        
        //extract jwt token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "");
        



        if (!token) {
            return res.status(401).json({
                success: false,
                messsage: 'token Missing',
            });
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                messsage: 'token is invalid',
            });
        }
        next();
    }
    catch (error)
    {
        return res.status(401).json({
            success: false,
            messsage: 'Something went wrong ,while verifying the token',
        });
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student")
        {
            return res.status(401).json({
                success: false,
                messsage: 'This is protected route for students'
            }); 
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            messsage: 'User Role is not matching',
            
        });
    }
}
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        messsage: "This is protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "User Role is not matching",
    });
  }
};