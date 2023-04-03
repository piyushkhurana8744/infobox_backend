const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { AgentModel } = require("../models/CreateAgentModel");

const router = express.Router();




router.get("/manage/:id", async (req, res) => {

  try {
   
    let users = await AgentModel.find({UserId: req.params.id});
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
   
    let agent = await AgentModel.findOne({$or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.phone }]});

    if(agent) {
      if (agent.phone == req.body.phone) {
        return res.status(400).send("phone number already exists...");
      } else {
        return res.status(400).send("Email already exists...");
      }
    }

    const { name, phone, email, password, UserId } = req.body;

    agent = new AgentModel({ name, phone, email, password, UserId });

    const salt = await bcrypt.genSalt(10);

    agent.password = await bcrypt.hash(agent.password, salt);
    agent.name = name;
    agent.phone = phone;
    agent.email = email;
    agent.UserId = UserId;
    agent.role = "agent";

  
    const registered = await agent.save();
    return res.status(200).send(registered);


  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


module.exports = router;
