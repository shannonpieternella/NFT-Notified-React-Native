const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
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
                    }

});

module.exports = mongoose.model('alert_request', PostSchema);