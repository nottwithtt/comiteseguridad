import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const acuerdoSchema: Schema = new Schema({
  numeroOrden: { type: Number, required: true },         
  descripcion: { type: String, required: true },      
  eventoId: { type: String, required: true }, 
  estado: { type: String, enum: ["Pendiente", "Completado"], required: true },  
});

// Infer 
export type AcuerdoT = InferSchemaType<typeof acuerdoSchema>;

// Export model
export default mongoose.model("Acuerdo", acuerdoSchema);
