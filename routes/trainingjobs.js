var express = require('express');
var router = express.Router();
var TrainingJob = require('../models/trainingjob');
//fs = require('fs')


/* GET ALL */
router.get('/', function (req, res, next) {
    console.log('get all training jobs');

    where = {}
    TrainingJob.countDocuments(where, (err, totalCount) => {
        if (err) {
            console.error(err);
            res.json({ message: err });
        }
        else {
            TrainingJob.find(where)
                .populate({
                     path: 'DataSet',
                })
                

                // .populate({
                //     path: 'plansetup',
                //     //select: 'Id', 
                //     model: 'PlanSetup'
                // })
                // .populate({
                //     path: 'sset',
                //     //select: 'Id', 
                //     model: 'StructureSet'
                // })
                // .skip(skip)
                // .limit(limit)
                // .sort([[filter.SortBy, filter.SortIncrement ? 1 : -1]])
                .exec((err, data) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: err });
                    }
                    else {
                        const ret = {
                            totalCount: totalCount,
                            list: data
                        }
    
                        res.json(ret);
                    }
                })
    
        }
    
    })
});


/* GET A */
router.get('/:id', function(req, res, next) {
  
    const id = req.params.id;
    console.log(id);
    
    StructureDataSet.findOne({_id:id})
    // .populate({path: 'TrainSet',
    //             model: 'Structure',
    //             select: 'Name'})
    .populate('DataSet')
    .then(data=>{
        
        console.log("returning a training job", `returning a training job of id=(${id})`, req)

        res.json(data);
    })
    .catch(err => {
        console.error(err);
        
        console.error("returning a training job failed", `returning a training job failed(${dataSetId})`, req)

        res.json({message: err});
    });
});

/* PUT A */
router.put('/:id', function(req, res, next) {
  
    const id = req.params.id;
    console.log(id);
   
    console.log('PUT request')

    const trainingJob = new TrainingJob(req.body);

    // TrainingJob.updateOne({_id: trainingJob._id}, trainingJob)

    // console.log(trainingJob)

    TrainingJob.updateOne({_id: trainingJob._id}, trainingJob)
    //trainingJob.save()
        .then(data => {
            console.log('saved... sending the response back...');
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log('error saving an object...', err);
            res.json(
                {
                    message: err
                });
        });

   
});

function filter2where(filter){
    var where = {}
    if (filter.Name !== "")
        if (filter.NameExactMatch)
            where.Name = { $regex: filter.Name.toLowerCase().trim() + '/i' }
        else
            where.Name = { $regex: '.*' + filter.Name.toLowerCase().trim() + '.*/i' }

    return where;
}



// get datasets with filter
router.post('/filtered', function (req, res, next) {

    filter = req.body

    console.log('----------- trainingjobs/filtered -------------')
    console.log('filter=', filter);

    // convert to where condision
    var where = filter2where(filter)

    // pagenation
    const skip = filter.ItemsPerPage * filter.PageNumber
    const limit = filter.ItemsPerPage

    console.log('find');
    console.log('where', where)

    TrainingJob.countDocuments(where, (err, totalCount) => {
        if (err) {
            console.error(err);
            res.json({ message: err });
        }
        else {
            TrainingJob.find(where)
                .populate({
                    path: 'DataSet',
                    //select: 'Id Sex', 
                    model: 'StructureDataSet'
                })
                // .populate({
                //     path: 'plansetup',
                //     //select: 'Id', 
                //     model: 'PlanSetup'
                // })
                // .populate({
                //     path: 'sset',
                //     //select: 'Id', 
                //     model: 'StructureSet'
                // })
                //.select("sset_list")
                .skip(skip)
                .limit(limit)
                //.sort([[filter.SortBy, filter.SortIncrement ? 1 : -1]])
                .exec((err, data) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: err });
                    }
                    else {
                        const ret = {
                            totalCount: totalCount,
                            list: data
                        }

                        res.json(ret);
                    }
                })

        }

    })

}); // post()

// POST A Dataset
router.post('/', function (req, res, next) {
    
    console.log('----------- post -------------')
    console.log(req.body);

    // fs.writeFile('file.json', JSON.stringify(req.body), err=>{
    //     if(err) console.log(err)
    //     console.log('save to file.json')
    // })

    console.log(JSON.stringify(req.body))

    const trainingJob = new TrainingJob(req.body);

    trainingJob.save()
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

/* DELETE A DS */
router.delete('/:id', function(req, res, next) {
  
    const id = req.params.id;
    console.log('deleting...',id);
    
    TrainingJob.remove({_id:id})
    .then(data=>{
        
        console.log("trainingjob deleted", `trainingjob deleted(${id})`, req)

        res.json(data);
    })
    .catch(err => {
        console.error(err);

        console.error("trainingjob delete failed", `trainingjob delete failed(${id})`, req)

        res.json({message: err});
    });
});

module.exports = router;