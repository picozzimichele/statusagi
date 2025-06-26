import mongoose, { Schema, models } from "mongoose";

const dataSchema = new Schema({}, { timestamps: true });

const Data = models.Data || mongoose.model("Data", dataSchema);

export default Data;
