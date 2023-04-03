const express = require("express");
const cors = require("cors")
const connect =  require('./src/config/db')
require("dotenv").config()
const createsuperadmin = require('./src/routes/CreateSuperAdmin')
const createadmin  = require('./src/routes/CreateAdmin')
const createuser  = require('./src/routes/CreateUser')
const agent  = require('./src/routes/CreateAgent')
const login  = require('./src/routes/Login')
const profile  = require('./src/routes/Profile')



const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery', true);

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/public', express.static('public'));

app.use("/api/superadmin", createsuperadmin);
app.use("/api/admin", createadmin);
app.use("/api/user", createuser);
app.use("/api/agent", agent);
app.use("/api/login", login);


app.use("/api/profile", profile);







app.listen(process.env.PORT, async()=>{

    try{
        await connect();
        console.log("Listening on port...");
    }
    catch(e){
        console.log(e.message);
        }
})