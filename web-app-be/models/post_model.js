import { Schema, model } from 'mongoose';
const {ObjectId} = Schema.Types;

const postSchema = new Schema({
    productName:{
        type: String,
        required : true
    },
    quantity:{
        type: Number,
        required : true
    },
    amount:{
        type: Number,
        required : true
    },
    author:{
        type: ObjectId,
        ref : "UserModel"
    }
});

model("PostModel", postSchema);