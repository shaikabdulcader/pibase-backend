import express from 'express';
import { createIframe, getIframe, updateIframe, deleteIframe } from './iframeService.js';

const router = express.Router();

router.get("/", getIframe);
router.post("/", createIframe);
router.put("/:id", updateIframe);
router.delete("/:id", deleteIframe);

export default router;