const mongoose = require('mongoose');

const PostMail = mongoose.Schema({
email_id: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now

}

});

module.exports = mongoose.model('mail', PostMail);