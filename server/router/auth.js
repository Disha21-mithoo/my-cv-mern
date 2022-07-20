const express = require("express");
const cookieParser = require('cookie-parser')
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const app = express();
router.use(cookieParser());

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", function(req, res) {
  res.send("Hello world from router.js!");
});

//using async function for creating register route :
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone,
    work,
    password,
    cpassword
  } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({
      error: "plz fill the property"
    });
  }

  try {
    const userExist = await User.findOne({
      email: email
    });

    if (userExist) {
      return res.status(422).json({
        error: "email already exists"
      });
    } else if(password != cpassword){
      return res.status(422).json({
        error: "passwords are not matching"});
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword
      });

      const userRegister = await user.save();
     console.log("user Registered succefully");
     console.log(userRegister);

      res.status(201).json({message: "user registered successfully"});
    }



  } catch (err) {
    console.log(err);
  }


});





// using promise method for creating login route:
router.post("/login", (req , res) => {
   const {email, password} = req.body;

   if(!email || !password){
     return res.status(400).json({error:"plz fill the data"});
   }

   User.findOne({email: email})
   .then((useremailExist) => {
     if(useremailExist){
    bcrypt.compare(password, useremailExist.password).then((passmatch) => {
   const token = useremailExist.generateAuthToken();
   res.cookie("jwtoken", token, {
     expires: new Date(Date.now() + 25892000000),
     httpOnly: true
   });


      if(passmatch){
        return res.json({message:"logged in"});
      } else {
        return res.status(400).json({message:"logged not pass"});
      }
}).catch(err => {console.log(err); });
    } else {
       return res.status(400).json({message:"logged not email"});
     }


   }).catch(err => {console.log(err); });
});


//about us ka page
router.get('/about', authenticate ,  (req,res) => {
  console.log("hello about");
  res.send("hello about worls!");
})



module.exports = router;
