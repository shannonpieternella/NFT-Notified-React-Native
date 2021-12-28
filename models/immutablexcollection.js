const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const PostCollections = mongoose.Schema({

collection_link: {
    type: String,
    required:true
    },
    floorprice: {
        type: Decimal128,
        required:true
        },
            collection_name: {
                type: String,
                required:true
                }
            

});

module.exports = mongoose.model('immutablexcollection', PostCollections);