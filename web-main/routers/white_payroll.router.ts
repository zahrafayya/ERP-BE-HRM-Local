import { Router } from 'express';
import { WhitePayrollController } from '../controllers/white_payroll.controller';

const router = Router();
const whitePayrollController = new WhitePayrollController();

router.get('/', (req, res) => whitePayrollController.findAll(req, res));
router.get('/:id', (req, res) => whitePayrollController.findByID(req, res));
router.post('/', (req, res) => whitePayrollController.create(req, res));
router.put('/:id', (req, res) => whitePayrollController.update(req, res));
router.delete('/:id', (req, res) => whitePayrollController.delete(req, res));

export default router;
