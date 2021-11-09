const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
email_id: {
type: String,
required: true
},
// user_id: {
//     type: String,
//     required:false
//     },
collection_link: {
    type: String,
    required:true
    },
    alert_floorprice: {
        type: Decimal128,
        required:true
        },
        // alert_type: {
        //     type: String,
        //     required:true
        //     },
            alert_cat: {
                type: String,
                required:true
                },
                status: {
                    type: Number,
                    required:true
                    },
                    pushkey: {
                        type: String,
                        required:true
                        }
                    

});

module.exports = mongoose.model('alert_collection', PostSchema);