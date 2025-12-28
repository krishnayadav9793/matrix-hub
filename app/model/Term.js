import mongoose from "mongoose";

const TermSchema = new  mongoose.Schema({
    topic:String,
    category:String,
    sub_category:String,
    definition_type:String,
    content:String,
    tags:Array
},{ timestamps: true });


export default mongoose.models.Term || mongoose.model('Term', TermSchema);