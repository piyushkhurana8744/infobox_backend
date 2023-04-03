const mongoose = require("mongoose");

const SuperAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  phone :{ type: String, required: true, },
  role: { type: String, default:"superadmin"  },

},

{
    timestamps:true,
    versionKey:false
});

const SuperAdmin = mongoose.model("superadmin", SuperAdminSchema);

exports.SuperAdmin = SuperAdmin;
