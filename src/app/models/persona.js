import mongoose, {Schema} from "mongoose";

const personaSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dob: String,
    premiumUser: Boolean,
    createdAt: Date,
    },
    {
        timestamps: true,
    }
);

const Persona = mongoose.models.Persona || mongoose.model('Persona', personaSchema);

export default Persona;