import { asyncHandler } from '../utils/asyncHandler.utils.js';
import Request from '../models/request.models.js';
import User from '../models/user.models.js';
import { ApiResponse } from '../utils/apiResponse.utils.js';
import { ApiError } from '../utils/apiError.utils.js';
import mongoose from 'mongoose';

// --- 1. Create Request (Handles the Proposal Submission) ---
export const createRequest = asyncHandler(async (req, res, next) => {
  const senderId = req.user && req.user._id;
  // Destructure fields sent from the frontend: receiver, skill (as requestedSkill), and note (as proposalNote)
  const { receiver, skill: requestedSkill, note: proposalNote } = req.body; 

  if (!senderId) return next(new ApiError(401, 'Not authenticated'));
  if (!receiver || !requestedSkill || !proposalNote) return next(new ApiError(400, 'Receiver, requested skill, and proposal note are required'));
  if (String(senderId) === String(receiver)) return next(new ApiError(400, 'Cannot create a request to yourself'));

  // CRITICAL: Parse the Offered Skill from the proposal note using the expected format: "I Teach: [Skill Name] | Note: [User Note]"
  const offeredSkillMatch = proposalNote.match(/I Teach: (.*?) \|/);
  const offeredSkill = offeredSkillMatch ? offeredSkillMatch[1].trim() : null; 

  // FIX: Validation check to prevent Mongoose error if parsing fails
  if (!offeredSkill) {
    return next(new ApiError(400, 'Could not parse your offered skill. Ensure the proposal format starts with "I Teach: [Your Skill] | Note: ..."'));
  }
  
  // Check for existing pending request (to prevent spam/duplicates)
  const existingRequest = await Request.findOne({
    sender: senderId,
    receiver: receiver,
    requestedSkill: requestedSkill,
    offeredSkill: offeredSkill,
    status: 'Pending'
  });

  if (existingRequest) {
    return next(new ApiError(409, 'A pending request with the same skills already exists.'));
  }

  const newRequest = await Request.create({
    sender: senderId,
    receiver: receiver,
    requestedSkill: requestedSkill,
    offeredSkill: offeredSkill,
    proposalNote: proposalNote,
    status: 'Pending',
  });

  return res.status(201).json(new ApiResponse(201, true, 'Skill swap request sent successfully', newRequest));
});


// --- 2. Get Requests (For requests.html) ---
export const getRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  if (!userId) return next(new ApiError(401, 'Not authenticated'));

  // Find requests where the user is EITHER the sender OR the receiver
  const requests = await Request.find({
    $or: [
      { sender: userId }, // Requests I sent
      { receiver: userId }, // Requests I received
    ],
  })
  .sort({ createdAt: -1 })
  // CRITICAL FIX: Populate sender and receiver to get profile data for the frontend
  .populate('sender', 'username fullname location bio socialLinks') 
  .populate('receiver', 'username fullname location bio socialLinks');

  // Format the data for the frontend to easily differentiate sent vs received
  const formattedRequests = requests.map(req => {
    const isSender = String(req.sender._id) === String(userId);
    return {
        ...req._doc,
        // Helper field for the frontend
        type: isSender ? 'sent' : 'received', 
        // User profile for the other person
        partner: isSender ? req.receiver : req.sender,
        // The skill they requested from *me*
        requestedFromMe: isSender ? req.receiver.fullname : req.sender.fullname
    };
  });
  
  return res.status(200).json(new ApiResponse(200, formattedRequests, 'Requests retrieved successfully'));
});


// --- 3. Accept Request (Receiver only) ---
export const acceptRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;
  const receiverId = req.user && req.user._id; 
  if (!receiverId) return next(new ApiError(401, 'Not authenticated'));

  const request = await Request.findById(requestId);
  if (!request) return next(new ApiError(404, 'Request not found'));

  // Authorization: Only the receiver can accept
  if (String(request.receiver) !== String(receiverId)) {
    return next(new ApiError(403, 'Not authorized to accept this request'));
  }

  if (request.status !== 'Pending') return next(new ApiError(400, 'Only pending requests can be accepted'));

  request.status = 'Connected';
  await request.save();

  // FIX: Should also update the users' myLearning/myTeaching arrays here if you have that implemented.
  
  return res.status(200).json(new ApiResponse(200, true, 'Request accepted', request));
});


// --- 4. Rejection/Cancellation Logic (Sender can Cancel, Receiver can Reject/Terminate) ---
export const rejectRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;
  const userId = req.user && req.user._id; 
  if (!userId) return next(new ApiError(401, 'Not authenticated'));

  const request = await Request.findById(requestId);
  if (!request) return next(new ApiError(404, 'Request not found'));

  // Authorization: Must be either the receiver (to reject) or the sender (to cancel)
  if (
    String(request.receiver) !== String(userId) &&
    String(request.sender) !== String(userId)
  ) {
    return next(new ApiError(403, 'Not authorized to reject this request'));
  }

  // Check: Allow rejection of Pending requests or cancellation of Connected requests
  if (!['Pending', 'Connected'].includes(request.status)) {
    return next(new ApiError(400, `Cannot reject/cancel a request with status: ${request.status}`));
  }

  // Set the status based on who is performing the action. 'Rejected' is fine for both.
  request.status = 'Rejected'; 
  await request.save();

  // FIX: Logic to remove from myLearning/myTeaching should be here if status was 'Connected'

  return res.status(200).json(new ApiResponse(200, true, 'Request rejected/cancelled', request));
});