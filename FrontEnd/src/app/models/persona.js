import mongoose, { Schema } from "mongoose";

const personaSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    dob: {
      type: String,
      required: [true, "Please provide a date of birth"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    premiumUser: { type: Boolean, default: false },
    forgotPassword: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,   
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const Persona =
  mongoose.models.Persona || mongoose.model("Persona", personaSchema);

export default Persona;
