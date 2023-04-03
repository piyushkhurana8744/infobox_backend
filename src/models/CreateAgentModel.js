const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  phone :{ type: String, required: true, },
  role: { type: String, default:"agent"  },
  UserId:{ type:mongoose.Schema.Types.ObjectId, ref:"users",required:true },

},

{
    timestamps:true,
    versionKey:false
});

const AgentModel = mongoose.model("agent", AgentSchema);

exports.AgentModel = AgentModel;
