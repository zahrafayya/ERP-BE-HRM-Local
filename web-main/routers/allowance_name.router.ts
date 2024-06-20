import { Router } from 'express';
import { AllowanceNameController } from '../controllers/allowance_name.controller';

const router = Router();
const allowanceNameController = new AllowanceNameController();

router.get('/', (req, res) => allowanceNameController.findAll(req, res));
router.get('/:id', (req, res) => allowanceNameController.findByID(req, res));
router.post('/', (req, res) => allowanceNameController.create(req, res));
router.put('/:id', (req, res) => allowanceNameController.update(req, res));
router.delete('/:id', (req, res) => allowanceNameController.delete(req, res));

export default router;
