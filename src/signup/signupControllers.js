import express from 'express';
import { createSignup, getSignup, updateSignup, deleteSignup } from './signupService.js';

const router = express.Router();

router.get("/", getSignup);
router.post("/", createSignup);
router.put("/:id", updateSignup);
router.delete("/:id", deleteSignup);

export default router;