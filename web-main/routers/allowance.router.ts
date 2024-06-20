import { Router } from 'express';
import { AllowanceController } from '../controllers/allowance.controller';

const router = Router();
const allowanceController = new AllowanceController();

router.get('/', (req, res) => allowanceController.findAll(req, res));
router.get('/names', (req, res) => allowanceController.findAllDistinctAllowanceNames(req, res));
router.get('/:id', (req, res) => allowanceController.findBySalarySlipID(req, res));
router.post('/', (req, res) => allowanceController.create(req, res));
router.put('/:id', (req, res) => allowanceController.update(req, res));
router.delete('/', (req, res) => allowanceController.delete(req, res));

export default router;
