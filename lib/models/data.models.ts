import mongoose, { Schema, models } from "mongoose";

const dataSchema = new Schema({}, { timestamps: true, strict: false });

const Data = models.Data || mongoose.model("Data", dataSchema);

export default Data;
