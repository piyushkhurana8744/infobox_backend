const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { SuperAdmin } = require("../models/CreateSuperAdminModel");

const router = express.Router();

router.post("/create", async (req, res) => {

    req.body.email = req.body.email.toLowerCase();
    req.body.name = req.body.name.toLowerCase();


  try {
   
    let superadmin = await SuperAdmin.findOne({$or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.phone }]});

    if (superadmin) {
      if (superadmin.phone == req.body.phone) {
        return res.status(400).send("phone number already exists...");
      } else {
        return res.status(400).send("Email already exists...");
      }
    }

    const { name, phone, email, password } = req.body;

    superadmin = new SuperAdmin({ name, phone, email, password });

    const salt = await bcrypt.genSalt(10);

    superadmin.password = await bcrypt.hash(superadmin.password, salt);
    superadmin.name = name;
    superadmin.phone = phone;
    superadmin.email = email;
    superadmin.role = "superadmin";

  
    const registered = await superadmin.save();
    return res.status(200).send(registered);


  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});








router.post("/login", async (req, res) => {
 
  let superadmin = await SuperAdmin.findOne({ email: req.body.email.toLowerCase()});

  if(!superadmin){
      return res.status(400).send("Invalid email or password...");
    }


  if(superadmin){
    
    const validPassword = await bcrypt.compare(req.body.password, superadmin.password);
    if (!validPassword)
    
    return res.status(400).send("Invalid email or password...");
    
    const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
    
    const token = jwt.sign(
      {
        _id: superadmin._id,
        name: superadmin.name,
        phone: superadmin.phone,
        email: superadmin.email,
        role: superadmin.role,
      },
      jwtSecretKey
      );
      
      res.send(token);
    }
});




module.exports = router;
