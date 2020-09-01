const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Department } = require('../models/department');

// => localhost:8081/Departments/
router.get('/', (req, res) => {
    Department.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Department :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Department.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Department :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var dept = new Department({
        code: req.body.code,
        name: req.body.name
         });
    dept.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Department Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var dept = {
        code: req.body.code,
        name: req.body.name
    };
    Department.findByIdAndUpdate(req.params.id, { $set: dept }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Department Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Department.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Department Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;