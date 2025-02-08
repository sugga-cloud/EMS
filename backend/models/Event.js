import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    imageUrl:{type:String,required:true},
    host: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // Corrected 'require' to 'required'
    registeredUser: [
        {
            id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // Corrected 'require' to 'required'
            status: { type: String, enum: ['Registered', 'Raised', 'Rejected'] }, // Corrected 'Registerd' typo to 'Registered'
        },
    ],
    title: { type: String, required: true },
    about: { type: String, required: true },
    timelines: [
        {
            date: { type: Date, required: true },
            information: { type: String, required: true },
        },
    ],
    status:{type:String,enum:["Ongoing","Ended","Paused"],default:"Ongoing"},
    relation: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
