import express from 'express';
import { createFeature, getFeature, updateFeature, deleteFeature } from './featureService.js';

const router = express.Router();

router.get("/", getFeature);
router.post("/", createFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

export default router;