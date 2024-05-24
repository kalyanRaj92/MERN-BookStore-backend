const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SignUpDetails = require('../models/signInModel');

// Route for SignUp
const signInUser = async(req, res)=>{
    try {
        const {name,email,password} = req.body;
        const exists = await SignUpDetails.findOne({email});
        if(exists){
            return res.status(400).send({message: "Email already exists"});
        }
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await new SignUpDetails({
            name,
            email,
            password:hashedPassword
        }) 
        await user.save();

        //Return JWT-Token
        const payload = {userId: user.id}
        const jwt_token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );

        res.status(201).send({user, message:"SignIn successfully", jwt_token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


// Route for Login
const logInUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        // Check if user exists
        const exists = await SignUpDetails.findOne({email});
        //console.log(exists);
        if(!exists){
            return res.status(400).send({message: "User not found"});
        }
        // Compare password
        const isPasswordMatched = await bcrypt.compare(password, exists.password);
        if(!isPasswordMatched){
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Return JWT-Token
        const payload = { userId: exists.id }
        const jwt_token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );

        res.status(200).json({message: 'Logged in successfully', jwt_token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {signInUser, logInUser};