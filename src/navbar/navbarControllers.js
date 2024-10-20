import express from 'express';
import { createNavbar, getNavbar, updateNavbar, deleteNavbar } from './navbarService.js';

const router = express.Router();

router.get("/", getNavbar);
router.post("/", createNavbar);
router.put("/:id", updateNavbar);
router.delete("/:id", deleteNavbar);

export default router;