import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const eventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  durationinhours: { type: Number, required: true },
});

export type eventT = InferSchemaType<typeof eventSchema>;

export default mongoose.model("Event", eventSchema);
