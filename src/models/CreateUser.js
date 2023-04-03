const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  phone :{ type: String, required: true, },
  web: { type: String, required: true},
  role: { type: String, default:"user"  },
  AdminId:{ type:mongoose.Schema.Types.ObjectId, ref:"admin",required:true },


},

{
    timestamps:true,
    versionKey:false
});

const User = mongoose.model("user", UserSchema);

module.exports = User
