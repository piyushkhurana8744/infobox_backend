const express = require("express");
const fs = require("fs");
const uploads = require("../middleware/upload");
const { ProfileModel } = require("../models/SuperadminproileModel");

const router = express.Router();




router.get("/:id", async (req, res) => {
  try {
    const profileimg = await ProfileModel.findOne({UserId: req.params.id});

   return  res.status(200).send(profileimg);

  } catch (error) {
    res.status(500).send("Error: " + error.message);

    // winston.error(error.message);
  }
});


router.post("/", uploads.single("image"), async (req, res) => {
  req.body.image = req.file.path;

  try {
    const profile = await ProfileModel.create(req.body);
    return res.status(200).send(profile);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});





router.post("/:id", uploads.single("image"), async (req, res) => {
  
  let Profileimg = await ProfileModel.findOne({ UserId: { $eq: req.params.id } });
  

  try {

    if(!Profileimg){
     req.body.image = req.file.path;
     const profile = await ProfileModel.create(req.body);
     return res.status(200).send(profile);

    }

    if (req.file) {
      let images = await ProfileModel.findOne({ UserId: { $eq: req.params.id } });
      fs.unlink(images.image, (err) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        } else {
          console.log("removed successful");
        }
      });
    }

    if (req.file) {
      req.body.image = req.file.path;
      let Profileimg = await ProfileModel.findOneAndUpdate({ UserId: { $eq: req.params.id } }, req.body);
      return res.status(200).send(Profileimg);
    } 
    else{

      let Profileimg = await ProfileModel.findOneAndUpdate({ UserId: { $eq: req.params.id } }, req.body);
      return res.status(200).send(Profileimg);
    }

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
