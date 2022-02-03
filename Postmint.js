const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
email_id: {
type: String,
required: false
},

                
                    pushkey: {
                        type: String,
                        required:false
                        },
                        
                                    imagecompany: {
                                        type: String,
                                        required:false
                                        },
                                        mintdatum: {
                                            type: String,
                                            required:false
                                            },
                                           revealdatum: {
                                                type: String,
                                                required:false
                                                },

                                                datumnotification: {
                                                    type: String,
                                                    required:false
                                                    },
                                                    chosentime: {
                                                        type: String,
                                                        required:false
                                                        },
                                                        statusnotification: {
                                                            type: Number,
                                                            required:false
                                                            },
                                                            companymintname: {
                                                                type: String,
                                                                required:false
                                                                },
                                                                usernotification: {
                                                                    type: String,
                                                                    required:false
                                                                    },
                                                                    checkboxarray: {
                                                                        type: Array,
                                                                        required:false
                                                                        },
    


                        
                    
                    

});

module.exports = mongoose.model('postmintcompanies', PostSchema);