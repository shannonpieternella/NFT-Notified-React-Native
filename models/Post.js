const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
email_id: {
type: String,
required: false
},
// user_id: {
//     type: String,
//     required:false
//     },
collection_link: {
    type: String,
    required:false
    },
    alert_floorprice: {
        type: Decimal128,
        required:false
        },
        // alert_type: {
        //     type: String,
        //     required:true
        //     },
            alert_cat: {
                type: String,
                required:false
                },
                status: {
                    type: Number,
                    required:false
                    },
                    pushkey: {
                        type: String,
                        required:false
                        },
                        pushswitch: {
                            type: String,
                            required:false
                            },
                            imgprofile: {
                                type: String,
                                required:false
                                },
                                eth_userinput: {
                                    type: Decimal128,
                                    required:false
                                    },
                                    name_collection: {
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

module.exports = mongoose.model('alert_collection', PostSchema);