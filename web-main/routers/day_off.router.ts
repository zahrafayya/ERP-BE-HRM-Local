import { Router } from 'express';
import { DayOffController } from '../controllers/day_off.controller';

const router = Router();
const dayOffController = new DayOffController();

router.get('/', (req, res) => dayOffController.findAll(req, res));
router.get('/:id', (req, res) => dayOffController.findByID(req, res));
router.post('/', (req, res) => dayOffController.create(req, res));
router.delete('/:id', (req, res) => dayOffController.delete(req, res));

export default router;
