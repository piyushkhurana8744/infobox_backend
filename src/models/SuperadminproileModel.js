const mongoose=require("mongoose")

const SuperAdminProfileSchema=mongoose.Schema({
    firstname:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    postalcode:{type:String,required:true},
    image:{type:String,required:true},
    UserId:{ type:mongoose.Schema.Types.ObjectId,required:true}
})



const ProfileModel = mongoose.model("profile",SuperAdminProfileSchema)

exports.ProfileModel = ProfileModel;