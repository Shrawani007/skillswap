// controllers/resources.controller.js
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import Resource from '../models/resource.models.js';
import { ApiResponse } from '../utils/apiResponse.utils.js';
import { ApiError } from '../utils/apiError.utils.js';
// Assuming findOrCreateSkill is an internal utility or controller
// import { findOrCreateSkill } from './skill.controller.js'; 


// --- 1. Create Resource ---
const createResource = asyncHandler(async (req, res, next) => {
    // Authorization Check (Assuming req.user is populated by middleware)
    if (!req.user) {
        return next(new ApiError(401, 'Unauthorized: User not authenticated.'));
    }
    const ownerId = req.user._id;

    const { 
        title, description, skill: skillName, 
        generalLink, videoLink, pdfPath, audioLink, imagePath 
    } = req.body;            
    
    if (!title || !skillName) {
        return next(new ApiError(400, 'Title and Subject/Skill are required.'));
    }
    
    if (!generalLink && !videoLink && !pdfPath && !audioLink && !imagePath) {
        return next(new ApiError(400, 'At least one resource link or image must be provided.'));
    }

    // CRITICAL: The skill is saved as a string (the name), not an ObjectId
    const normalizedSkillName = skillName.toLowerCase().trim(); 

    const newResource = await Resource.create({
        owner: ownerId,
        title,
        description,
        skill: normalizedSkillName, // Save as string name
        generalLink, videoLink, pdfPath, audioLink, imagePath,
    });

    return res.status(201).json(new ApiResponse(201, newResource, 'Resource created successfully'));
});


// --- 2. Get All Resources (Owned or Shared) ---
const getAllResources = asyncHandler(async (req, res, next) => {
    const userId = req.user && req.user._id;
    if (!userId) {
        return next(new ApiError(401, 'Unauthorized: User not authenticated.'));
    }

    // Find resources owned by the user OR shared with the user
    const resources = await Resource.find({
        $or: [
            { owner: userId },
            { sharedWith: userId }
        ]
    })
    .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, resources, 'Resources retrieved successfully'));
});


// --- 3. Delete Resource (Owner only) ---
const deleteResource = asyncHandler(async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user && req.user._id;
    
    if (!userId) return next(new ApiError(401, 'Unauthorized.'));
    
    const resource = await Resource.findOneAndDelete({ 
        _id: resourceId, 
        owner: userId // Ensure only the owner can delete
    });

    if (!resource) {
        return next(new ApiError(404, 'Resource not found or you are not the owner.'));
    }

    return res.status(200).json(new ApiResponse(200, null, 'Resource deleted successfully'));
});


// --- 4. Update Resource (Owner only) ---
const updateResource = asyncHandler(async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user && req.user._id;
    
    if (!userId) return next(new ApiError(401, 'Unauthorized.'));

    const { title, description, skill, generalLink, videoLink, pdfPath, audioLink, imagePath } = req.body;

    const updateFields = {
        title, description, generalLink, videoLink, pdfPath, audioLink, imagePath
    };
    
    // Only update skill if provided, and normalize it
    if (skill) {
        updateFields.skill = skill.toLowerCase().trim();
    }
    
    // Perform update, ensuring the user is the owner
    const updatedResource = await Resource.findOneAndUpdate(
        { _id: resourceId, owner: userId },
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    if (!updatedResource) {
        return next(new ApiError(404, 'Resource not found or you are not the owner.'));
    }

    return res.status(200).json(new ApiResponse(200, updatedResource, 'Resource updated successfully'));
});


// --- 5. Toggle Share Resource (Owner only) ---
const toggleShareResource = asyncHandler(async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user && req.user._id;
    
    if (!userId) return next(new ApiError(401, 'Unauthorized.'));

    const { targetUserId, action } = req.body; // action: 'share' or 'unshare'

    if (!targetUserId || !['share', 'unshare'].includes(action)) {
        return next(new ApiError(400, 'Target User ID and a valid action ("share" or "unshare") are required.'));
    }

    const resource = await Resource.findById(resourceId);
    
    if (!resource) return next(new ApiError(404, 'Resource not found.'));
    if (String(resource.owner) !== String(userId)) {
        return next(new ApiError(403, 'Not authorized: You do not own this resource.'));
    }

    let update;
    if (action === 'share') {
        update = { $addToSet: { sharedWith: targetUserId } };
    } else {
        update = { $pull: { sharedWith: targetUserId } };
    }

    const updatedResource = await Resource.findByIdAndUpdate(resourceId, update, { new: true });

    return res.status(200).json(new ApiResponse(200, updatedResource, `Resource ${action}d successfully`));
});


// --- 6. Get Resources by Owner and Skill (For Requests/Profile Pages) ---
const getOwnerResourcesBySkill = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new ApiError(401, "Unauthorized: User not authenticated."));
  }

  const { ownerId } = req.params;
  const { skillName } = req.query;

  if (!ownerId) {
    return next(new ApiError(400, "Owner ID is required in path."));
  }

  const filter = { owner: ownerId };
  if (skillName) filter.skill = skillName.toLowerCase().trim();

  const resources = await Resource.find(filter)
    .select("-owner -sharedWith")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, resources, "Resources fetched successfully"));
});


// IMPORTANT: Export all functions only once at the end. 
export { 
    createResource, 
    getAllResources, 
    deleteResource, 
    updateResource, 
    toggleShareResource, 
    getOwnerResourcesBySkill 
};