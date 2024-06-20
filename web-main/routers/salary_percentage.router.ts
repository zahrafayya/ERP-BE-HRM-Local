import { Router } from 'express';
import { SalaryPercentageController } from '../controllers/salary_percentage.controller';

const router = Router();
const salaryPercentageController = new SalaryPercentageController();

router.get('/', (req, res) => salaryPercentageController.findByID(req, res));
router.put('/:id', (req, res) => salaryPercentageController.update(req, res));

export default router;
