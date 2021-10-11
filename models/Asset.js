const mongoose = require('mongoose');

const PostAsset = mongoose.Schema({
email_id: {
type: String,
required: true
},
user_id: {
    type: String,
    required:false
    },
contract: {
    type: String,
    required:true
    },
    asset_number: {
        type: Number,
        required:true
        },
    alert_price: {
        type: Number,
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
// date: {
// type: Date,
// default: Date.now

// }

});

module.exports = mongoose.model('asset_numbers', PostAsset);