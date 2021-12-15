const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema ({
    poster: {type:String},
    subject: {type:String},
    code: {type:String},
    //comments: [{comment:String}]
    comments: [{ commentor: String, comment: String }]

})

module.exports = mongoose.model("Snippet", postSchema)