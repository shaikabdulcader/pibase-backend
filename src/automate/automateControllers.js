import express from 'express';
import { createAutomate, getAutomate, updateAutomate, deleteAutomate } from './automateService.js';

const router = express.Router();

router.get("/", getAutomate);
router.post("/", createAutomate);
router.put("/:id", updateAutomate);
router.delete("/:id", deleteAutomate);

export default router;