const mongoose = require('mongoose');

const TrainingJobSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            index: true,
            required:true, 
            //unique: true,
        },
        NameLower: {type: String, index: true},
        Description: String,
        OwnerName: String, 
        OwnerEmail: String, 
        Model: String, 
        Status: String,
        Parameters: mongoose.SchemaTypes.Object,
        // list of training set
        DataSet: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "StructureDataSet"
        },
        SearchFilter: Object,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('TrainingJob', TrainingJobSchema);