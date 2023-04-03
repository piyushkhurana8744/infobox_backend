const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  phone :{ type: String, required: true, },
  web: { type: String, required: true},
  role: { type: String, default:"admin"  },
  SuperAdminId:{ type:mongoose.Schema.Types.ObjectId, ref:"superadmin",required:true },


},

{
    timestamps:true,
    versionKey:false
});

const Admin = mongoose.model("admin", AdminSchema);

exports.Admin = Admin;
