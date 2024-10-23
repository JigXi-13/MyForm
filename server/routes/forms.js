import express from 'express';
import { createForm, deleteForm, getForm, getForms, updateForm } from '../controllers/forms.js';

const router = express.Router();

router.get('/', getForms);
router.post('/', createForm);
router.get('/:id', getForm);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);

export default router;