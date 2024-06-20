import { Router } from 'express';
import { BukpotBlueController } from '../controllers/bukpot_blue.controller';

const router = Router();
const bukpotBlueController = new BukpotBlueController();

router.get('/', (req, res) => bukpotBlueController.findAll(req, res));
router.get('/:id', (req, res) => bukpotBlueController.findByID(req, res));
router.post('/', (req, res) => bukpotBlueController.create(req, res));
router.put('/:id', (req, res) => bukpotBlueController.update(req, res));
router.delete('/:id', (req, res) => bukpotBlueController.delete(req, res));

export default router;
