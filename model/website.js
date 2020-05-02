const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteSchema = new Schema({
   _id: {
       type : Number,
       required : true
   },

   official: {
       type : Boolean,
       required: true
   },

   name:{
       type: String,
       required: true
   },

   url: {
       type: String,
       required: true
   },

   hostnames: [{
       type: String,
       required: true,
   }],

   appID:{
       type: String
   },
}, {
    timestamps: true,
});

module.exports = Website = mongoose.model("websites", WebsiteSchema);