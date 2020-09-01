var mongoose =require('mongoose');
var Employee=mongoose.model('employees',{
    empid: {type:String},
    city: {type:String},
    department:{type:String},
    email: {type:String},
    fullName: {type:String},
    gender:{type:String},
    hireDate: {type:String},
    isPermanent:{type:Boolean},
    mobile:{type:String}
 });
module.exports={Employee};