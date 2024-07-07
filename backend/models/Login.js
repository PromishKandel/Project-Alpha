const mongoose = require('mongoose')

const LoginDataSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    }
});

const LoginData = mongoose.model('LoginData', LoginDataSchema);
module.exports = LoginData;