const mongoose = require('mongoose');
const validator = require('validator');

var issueSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type: String, required: true},
    issueType:{type: String, required: true},
    issueTitle:{type: String, required: true},
    description:{type: String, required: true},
    role:{type:'string',default:'user'},
    createdAt:{type: Date, default: Date.now()},
    inProgressDate:{type: Date, default:null},
    closedDate:{type: Date, default:null},
    status:{type: String, default:"Open"},
    comments:{type: String, default:"This issue will be addressed shortly!"}
})

const userSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',require:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    password:{type:'string',required:true},
    role:{type:'string',default:'user'},
    createdAt:{type:Date,default:Date.now()}
})

var issueTypeSchema = new mongoose.Schema({
    issue_type:{type: String, required: true}
})

let issueModel = mongoose.model('issues',issueSchema);
let issueTypeModel = mongoose.model('issue-type', issueTypeSchema);
let usersModel = mongoose.model('users',userSchema);


module.exports = {mongoose, issueModel, issueTypeModel, usersModel}

