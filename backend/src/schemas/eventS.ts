import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const eventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  acuerdos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Acuerdo" }], 
  durationinhours: { type: Number, required: true },
  dateend: {type: Date, required: true}
});

export type eventT = InferSchemaType<typeof eventSchema>;

export default mongoose.model("Event", eventSchema);
