import mongoose, {Schema} from "mongoose";

const prescriptionSchema = new Schema({
    symptoms:{
        type: [String],
        required: true
    },
    diseases:{
        type: [String],
        required: true
    },
    cure:{
        type: String,
        required: true
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema)
export default Prescription