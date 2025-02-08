import mongoose from 'mongoose';

const model = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:String},
    status:{type:String},
    appliedEvents:[{type:mongoose.Types.ObjectId, ref:"Event"}],
    HostedEvents:[{type:mongoose.Types.ObjectId, ref:"Event"}],
    otp:{type:Number}
});

export default mongoose.model('User',model);