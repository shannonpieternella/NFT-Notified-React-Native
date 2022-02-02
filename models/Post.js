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
                        },
                        pushswitch: {
                            type: String,
                            required:true
                            },
                            imgprofile: {
                                type: String,
                                required:true
                                },
                                eth_userinput: {
                                    type: Decimal128,
                                    required:true
                                    },
                                    name_collection: {
                                        type: String,
                                        required:true
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

module.exports = mongoose.model('alert_collection', PostSchema);