import express from 'express';
import { createIntegration, getIntegration, updateIntegration, deleteIntegration } from './integrationService.js';

const router = express.Router();

router.get("/", getIntegration);
router.post("/", createIntegration);
router.put("/:id", updateIntegration);
router.delete("/:id", deleteIntegration);

export default router;