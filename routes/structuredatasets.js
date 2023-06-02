var express = require('express');
var router = express.Router();
var Structure = require('../models/structure');
var StructureDataSet = require('../models/structuredataset');
//fs = require('fs')

/* GET ALL structure datasets */
router.get('/', function (req, res, next) {
    console.log('get all structure dataset');

    StructureDataSet.find()
        // .populate({
        //     path: 'TrainSet',
        //     //select: 'Id Sex', 
        //     model: 'Structure'
        // })
        // .populate({
        //     path: 'ValidSet',
        //     //select: 'Id', 
        //     model: 'Structure'
        // })
        // .populate({
        //     path: 'TestSet',
        //     //select: 'Id', 
        //     model: 'Structure'
        // })
        //.select("sset_list")
        //.limit(100)
        //.sort([['HistoryDateTime', -1]])
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err });
        });
});



// POST A Dataset
router.post('/', function (req, res, next) {
    
    console.log('----------- post -------------')
    console.log(req.body);

    // fs.writeFile('file.json', JSON.stringify(req.body), err=>{
    //     if(err) console.log(err)
    //     console.log('save to file.json')
    // })

    console.log(JSON.stringify(req.body))

    const structureDataSet = new StructureDataSet(req.body);

    structureDataSet.save()
        .then(data => {
            console.log('saved... sending the response back...');
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log('error saving a log...');
            res.json(
                {
                    message: err
                });
        });
}); // post()


module.exports = router;