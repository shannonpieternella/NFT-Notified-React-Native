const mongoose = require('mongoose');

const PostSchemacontract = mongoose.Schema({
email_id: {
type: String,
required: true
},
contract: {
    type: String,
    required:true
    },
    alert_price: {
        type: Number,
        required:true
        },
        alert_type: {
            type: String,
            required:true
            },
            alert_cat: {
                type: String,
                required:true
                },
                status: {
                    type: Number,
                    required:true
                    },
date: {
type: Date,
default: Date.now

}

});

module.exports = mongoose.model('contract_details', PostSchemacontract);