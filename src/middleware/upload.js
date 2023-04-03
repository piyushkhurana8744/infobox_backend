

const multer = require("multer")

const storage = multer.diskStorage({
                destination: function(req, file, cb){
                cb(null,'public/profiles' )
    },

    filename: function(req, file, cb){
      const date = Date.now() 
      cb(null,  date+"-"+file.originalname)
    }
  })
  
  function fileFilter(req, file, cb){
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/jpg"){
        cb(null, true)
    }
    
   else{
    cb(
      new Error("please change your file type or fill type not support")
      ,false)
   }
}
const mustbe={
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
}
const uploads = multer(mustbe)
module.exports=uploads


