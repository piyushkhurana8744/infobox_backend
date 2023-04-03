const mongoose=require("mongoose")

const adminProfileSchema=mongoose.Schema({
    firstname:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    postalcode:{type:String,required:true},
    image:{type:String,required:true},
    AdminId:{ type:mongoose.Schema.Types.ObjectId, ref:"admin",required:true}
})

const adminProfileModal=mongoose.model("adminprofile",adminProfileSchema)

module.exorts=adminProfileModal