const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { Admin } = require("../models/CreateAdmin");

const router = express.Router();





router.get("/manage/:id", async (req, res) => {

  try {
   
    let admin = await Admin.find({SuperAdminId: req.params.id});
    return res.status(200).send(admin);
  } 
  
    catch (error) {

    res.status(500).send("Error: " + error.message);
  }
});


router.post("/create", async (req, res) => {

    req.body.email = req.body.email.toLowerCase();
    req.body.name = req.body.name.toLowerCase();


  try {
   
    let admin = await Admin.findOne({$or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.phone }]});

    if (admin) {
      if (admin.phone == req.body.phone) {
        return res.status(400).send("phone number already exists...");
      } else {
        return res.status(400).send("Email already exists...");
      }
    }

    const { name, phone, email, password, web, SuperAdminId } = req.body;

    admin = new Admin({ name, phone, email, password, web ,SuperAdminId });

    const salt = await bcrypt.genSalt(10);

    admin.password = await bcrypt.hash(admin.password, salt);
    admin.name = name;
    admin.phone = phone;
    admin.email = email;
    admin.web = web;
    admin.SuperAdminId = SuperAdminId;
    admin.role = "admin";

  
    const registered = await admin.save();
    return res.status(200).send(registered);


  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});





router.post("/login", async (req, res) => {
 
  let admin = await Admin.findOne({ email: req.body.email.toLowerCase()});

  if(!admin){
      return res.status(400).send("Invalid email or password...");
    }

  if(admin){
    
    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword)
    return res.status(400).send("Invalid email or password...");
    
    const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
    
    const token = jwt.sign(
      {
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        web : admin.web,
        role: admin.role,
      },
      jwtSecretKey
      );
      
      res.send(token);
    }
});


module.exports = router;
