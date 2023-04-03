const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { SuperAdmin } = require("../models/CreateSuperAdminModel");
const { Admin } = require("../models/CreateAdmin");
const User = require("../models/CreateUser");
const { AgentModel } = require("../models/CreateAgentModel");

const router = express.Router();








router.post("/", async (req, res) => {
 
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const collections = [User, Admin, SuperAdmin, AgentModel];

    try {
        for (const collection of collections) {
          const result = await collection.findOne({ email, email });
          if (result) {

            const validPassword = await bcrypt.compare(password, result.password);
            if (!validPassword)
            
            return res.status(400).send("Invalid email or password...");
            
            const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
            
            const token = jwt.sign({
                _id: result._id,
                name: result.name,
                phone: result.phone,
                email: result.email,
                role: result.role,
            },jwtSecretKey);
            
            return res.send(token);


            // const role = getRole(collection); // use a helper function to determine the user's role based on the collection name
            // return res.json({ success: true, role });
          }
        }
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
      } catch (error) {
       return  res.status(500).json({ success: false, message: error });
      }


    // try{
    

        // const superadmin = await SuperAdmin.findOne({ email: email});

        // if (superadmin) {
            // const validPassword = await bcrypt.compare(password, superadmin.password);
            // if (!validPassword)
            
            // return res.status(400).send("Invalid email or password...");
            
            // const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
            
            // const token = jwt.sign({
            //     _id: superadmin._id,
            //     name: superadmin.name,
            //     phone: superadmin.phone,
            //     email: superadmin.email,
            //     role: superadmin.role,
            // },jwtSecretKey);
            
            // res.send(token);
        // }

        // if(!superadmin){

        //     const admin = await Admin.findOne({ email: email});

        //     if (admin) {
        //         const validPassword = await bcrypt.compare(password, admin.password);
        //         if (!validPassword)
                
        //         return res.status(400).json({ success: false, message: 'Invalid email or password' });
                
        //         const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
                
        //         const token = jwt.sign({
        //             _id: admin._id,
        //             name: admin.name,
        //             phone: admin.phone,
        //             email: admin.email,
        //             role: admin.role,
        //         },jwtSecretKey);
                
        //         res.send(token);
        //     }
    
        //     const user = await User.findOne({ email: email});
        

        //         if (user) {
        //             const validPassword = await bcrypt.compare(password, user.password);
        //             if (!validPassword)
                    
        //             return res.status(400).json({ success: false, message: 'Invalid email or password' });
                    
        //             const jwtSecretKey = process.env.CNS_JWT_SECRET_KEY;
                    
        //             const token = jwt.sign({
        //                 _id: user._id,
        //                 name: user.name,
        //                 phone: user.phone,
        //                 email: user.email,
        //                 role: user.role,
        //             },jwtSecretKey);
                    
        //             res.send(token);
        
        //     }

        // }

    
      
    //    return  res.status(400).json({ success: false, message: 'Invalid email or password' });
      

    // }

    // catch(err){

    //     return res.status(403).send({message:err.message});

    // }


  
});




module.exports = router;
