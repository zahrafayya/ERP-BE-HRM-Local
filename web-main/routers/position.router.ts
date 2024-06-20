import { Router } from 'express';
import { PositionController } from '../controllers/position.controller';

const router = Router();
const positionController = new PositionController();

router.get('/', (req, res) => positionController.findAll(req, res));
router.get('/:id', (req, res) => positionController.findByID(req, res));
router.post('/', (req, res) => positionController.create(req, res));
router.put('/:id', (req, res) => positionController.update(req, res));
router.delete('/:id', (req, res) => positionController.delete(req, res));

export default router;
