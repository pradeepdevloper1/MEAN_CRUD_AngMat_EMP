var http = require('http');
var express=require('express');
var port = process.env.port || 9091;
var app= express();
var EmpAppRoutes=require('./routes/EmpAppRoutes');
var DeptAppRoutes=require('./routes/DeptAppRoutes');
var mongoose =require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');

mongoose.connect('mongodb://localhost/AngMatEmpDB',{useUnifiedTopology:true,useNewUrlParser:true});
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/employees',EmpAppRoutes);
app.use('/api/departments',DeptAppRoutes);
http.createServer(app).listen(port);
console.log("Backend Running on Port :",port );