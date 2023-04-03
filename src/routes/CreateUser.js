const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const User = require("../models/CreateUser");

const router = express.Router();




router.get("/manage/:id", async (req, res) => {

  console.log("GET /man")


  try {
   
    let users = await User.find({AdminId: req.params.id});
    return res.status(200).send(users);
  } 
  
    catch (error) {

    res.status(500).send("Error: " + error.message);
  }
});




router.post("/create", async (req, res) => {

    req.body.email = req.body.email.toLowerCase();
    req.body.name = req.body.name.toLowerCase();


  try {
   
    let user = await User.findOne({$or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.phone }]});

    if (user) {
      if (user.phone == req.body.phone) {
        return res.status(400).send("phone number already exists...");
      } else {
        return res.status(400).send("Email already exists...");
      }
    }

    const { name, phone, email, password, web, AdminId } = req.body;

    user = new User({ name, phone, email, password, web ,AdminId });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.web = web;
    user.AdminId = AdminId;
    user.role = "user";

  
    const registered = await user.save();
    return res.status(200).send(registered);


  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});





router.post("/login", async (req, res) => {
 
  let user = await User.findOne({ email: req.body.email.toLowerCase()});

  if(!user){
      return res.status(400).send("Invalid email or password...");
    }

  if(user){
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
    return res.status(400).send("Invalid email or password...");
    
    const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
    
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        web : user.web,
        role: user.role,
      },
      jwtSecretKey
      );
      
      res.send(token);
    }
});


module.exports = router;
