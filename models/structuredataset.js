const mongoose = require('mongoose');

// images and segmentation labels
const StructureDataSetSchema = mongoose.Schema(
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
        // list of training set
        TrainSet: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Structure"
        }],
        ValidSet: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Structure"
        }],
        TestSet: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Structure"
        }],
        StructureSelectionFilter: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "StructureFilter"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('StructureDataSet', StructureDataSetSchema);