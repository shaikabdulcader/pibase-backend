import express from 'express';
import { createContact, getContact, updateContact, deleteContact } from './contactService.js';

const router = express.Router();

router.get("/", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;