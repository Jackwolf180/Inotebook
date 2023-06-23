const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator"); // imported the validation from the express module
var jwt = require("jsonwebtoken");
const JWT_SECRET2 = "hellowmynameisadityajugganaut";
const fetchUser=require("../middleware/fetchUser");

// ROUTE 1 :create a user using :POST "/api/auth/createuser". No logign required

router.post(
  "/createuser",
  [
    // we have created a array to validate the field in the user schema
    body("name", "Enter a valid Name").isLength({ min: 2 }), // applying the validation for the name
    body("email", "Enter a valid Email").isEmail(), // applying the validation for the email
    body("password", "the password must be of atleast 5 characters").isLength({
      min: 5,
    }), // applying the validation for the password
  ],
  async (req, res) => {
    // if there are no errors , return bad request and the errors
    let success=false;
    const errors = validationResult(req); // checking the validation results and then sending the error log as the status
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }

    // check weather the user with the same email exists already
    try {
      let user = await User.findOne({ email: req.body.email }); // finding if a user with this email aready exists with this email and sendng the response if it is true here itself . we need to await this because it retruns a promise 
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10); // usitn bcryp to creat a salt
      const secPas = await bcrypt.hash(req.body.password, salt); // using bcryp's hash fuction to creat a hash of the users password

      user = await User.create({
        // creating the user if there is no error
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET2);
      // here we wont be sending the user information in the response instead we will be sending the authtoken which will help to varify the user in the subsequent sessions
      // res.json(users); // the response to be send if ther is no user in the database

      // the user can be varified by ussing the jwt.varify() inorder to varify the user
      res.json({success:true ,authToken }); // here we are using the ES6 formate so that we dont need to writ "json({authtoken:authtoken})"

      //   .then((user) => res.json(user))
      //   .catch((error) => {
      //     // sending the user details as the response if there is no error otherwise catching it using the catch syntex and displaying the error logs in the console aswell as the response
      //     console.log(error);
      //     res.json({
      //       error: "please enter a unique value of email",
      //       message: error.message,
      //     });
      //   });
    } catch (error) {
      console.error(error.message); // displaying the error message in the console
      res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
    }
  }
);

// ROUTE 2 :create a user using :POST "/api/auth/login". No logign required

router.post(
  "/login",
  [
    // we have created a array to validate the field in the user schema
    body("email", "Enter a valid Email").isEmail(), // applying the validation for the email
    body("password", "Password cannot be blank").exists(), // applying the validation for the password
  ],
  async (req, res) => {
    // if there are no errors , return bad request and the errors

    let success=false;

    const errors = validationResult(req); // checking the validation results and then sending the error log as the status
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check weather the user with the same email exists already
    try {
      const {email,password}=req.body;// destructiuring the email and the password form the respondse 
      let user = await User.findOne({email}); // finding if a user with this email aready exists with this email and sendng the response if it is true here itself . we need to await this because it retruns a promise
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });// condition if the user with this credentioal does not exists then the respond to be sent the user 
      }

      const passComp = await bcrypt.compare(password, user.password); // using bcryp's compare fuction to comparer the hash of the users password to that stored in the database 
      if(!passComp){
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET2);
      // here we wont be sending the user information in the response instead we will be sending the authtoken which will help to varify the user in the subsequent sessions
      // res.json(users); // the response to be send if ther is no user in the database

      // the user can be varified by ussing the jwt.varify() inorder to varify the user

      res.json({success:true, authToken }); // here we are using the ES6 formate so that we dont need to writ "json({authtoken:authtoken})"
    } catch (error) {
      console.error(error.message); // displaying the error message in the console
      res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
    }
  }
);








//ROUTE 3 :  GET LOGGED IN USER DETAILS :POST "/api/auth/getuser".  logign required

router.post(
  "/getuser",fetchUser,
  async (req, res) => {
    try {
      const userId= req.user.id
      let user = await User.findById(userId).select("-password"); 
      res.send(user) // here we are using the ES6 formate so that we dont need to writ "json({authtoken:authtoken})"
    } catch (error) {
      console.error(error.message); // displaying the error message in the console
      res.status(500).send("Internal Server error"); // sending the error code and the error message to the user
    }
  }
);

module.exports = router;
