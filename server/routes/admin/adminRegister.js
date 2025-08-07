import express from 'express';
import { addAdmin, deleteAdmin, editAdmin, getAllAdmins, loginAdmin } from '../../controllers/admin/adminAdd-controller.js';


const router = express.Router();

// Add new admin/subadmin
router.post('/add', addAdmin);

// Fetch all admins/subadmins (including their passwords)
router.get('/list', getAllAdmins);

// Login (email, password)
router.post('/login', loginAdmin);

// Edit admin by id
router.put('/edit/:id', editAdmin);

// Delete admin by id
router.delete('/delete/:id', deleteAdmin);

export default router;
