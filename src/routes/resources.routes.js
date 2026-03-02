import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createResource,
  getAllResources,
    updateResource,
    deleteResource,
    toggleShareResource,
  getOwnerResourcesBySkill,
} from "../controllers/resources.controller.js";

const router = express.Router();

// Create resource
router.post("/", verifyJWT, createResource);

// Get all resources (for logged-in user)
router.get("/", verifyJWT, getAllResources);

// Get another user's resources by ownerId and optional skillName
// example: /api/resources/owner/66fee917d7002019da7?skillName=react
router.get("/owner/:ownerId", verifyJWT, getOwnerResourcesBySkill);

// Update / Delete / Share
router.put("/:id", verifyJWT, updateResource);
router.delete("/:id", verifyJWT, deleteResource);
router.post("/:id/share", verifyJWT, toggleShareResource);

export default router;
