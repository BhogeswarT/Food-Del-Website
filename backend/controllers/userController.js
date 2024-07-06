//login and signup logic 

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) => {
   const {email,password} = req.body;
   try {
     const user = await userModel.findOne({email});  //finding if user exist

     if(!user){
       return res.json({success:false,message:"User doesn't exist"})
     }

     const isMatch = await bcrypt.compare(password,user.password);  //comparing entered password with original password set by user
     if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
     }

     const token = createToken(user._id);
     res.json({success:true,token})

   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//reginster user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });  //checking if user already exists
        if (exists) { //if email is already present in database
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name, //we get it from ewq.body
            email: email,
            password: hashedPassword
        })

        //saving user in database
        const user = await newUser.save()
        const token = createToken(user._id)  //we send this token as response 
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }