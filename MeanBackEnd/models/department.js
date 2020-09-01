var mongoose =require('mongoose');
var Department=mongoose.model('departments',{
    code: {type:String},
    name: {type:String}
 });
module.exports={Department};