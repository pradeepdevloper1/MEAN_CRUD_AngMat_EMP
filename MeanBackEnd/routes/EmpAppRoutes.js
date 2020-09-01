const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:8081/Employee/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        empid: req.body.empid,
        city: req.body.city,
        department: req.body.department,
        email: req.body.email,
        fullName: req.body.fullName,
        gender: req.body.gender,
        hireDate: req.body.hireDate,
        isPermanent: req.body.isPermanent,
        mobile: req.body.mobile
         });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        empid: req.body.empid,
        city: req.body.city,
        department: req.body.department,
        email: req.body.email,
        fullName: req.body.fullName,
        gender: req.body.gender,
        hireDate: req.body.hireDate,
        isPermanent: req.body.isPermanent,
        mobile: req.body.mobile
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
       // var myquery = { OrderID: req.params.OrderID };
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;