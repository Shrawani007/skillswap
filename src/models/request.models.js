import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // CRITICAL CHANGE 1: What the sender WANTS (was previously 'skill')
  requestedSkill: { 
    type: String, 
    required: true 
  },
  // CRITICAL CHANGE 2: What the sender is OFFERING
  offeredSkill: { 
    type: String, 
    required: true
  },
  // CRITICAL CHANGE 3: The detailed note from the swap pop-up
  proposalNote: {
      type: String,
      required: true
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Connected', 'Rejected'], 
    default: 'Pending' 
  },
}, 
{ timestamps: true });

// Ensure unique pending requests between two users for a specific skill pair
RequestSchema.index({ sender: 1, receiver: 1, requestedSkill: 1, offeredSkill: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'Pending' } });

export default mongoose.model('Request', RequestSchema);