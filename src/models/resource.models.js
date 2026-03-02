// models/resource.models.js (Updated)
import mongoose from "mongoose";
const { Schema, Types } = mongoose; // Destructure Types from mongoose

const resourceSchema = new mongoose.Schema({
  // 🔑 NEW: Owner field for access control
  owner: { type: Types.ObjectId, ref: "User", required: true }, 

  // 🔑 NEW: Array of User IDs who have been granted access
  sharedWith: [{ 
      type: Types.ObjectId, 
      ref: "User" 
  }], 
  
  // Resource Metadata (Required)
  skill: { type: String, required: true },          // Subject/Skill Category (saved as a string name)
  title: { type: String, required: true },
  description: { type: String },
  folder: { type: String, default: "My Resources" }, 
  
  // Separate Optional Resource Fields (URLs/Paths)
  imagePath: { type: String }, 
  generalLink: { type: String },   
  videoLink: { type: String },    
  pdfPath: { type: String },      
  audioLink: { type: String },       
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resource", resourceSchema);