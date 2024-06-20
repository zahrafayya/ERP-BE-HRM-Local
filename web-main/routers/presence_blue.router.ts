import { Router } from 'express';
import { PresenceBlueController } from '../controllers/presence_blue.controller';

const router = Router();
const presenceBlueController = new PresenceBlueController();

router.get('/', (req, res) => presenceBlueController.findAll(req, res));
router.get('/:id', (req, res) => presenceBlueController.findByID(req, res));
router.post('/hour_count', (req, res) => presenceBlueController.countHour(req, res));
router.post('/', (req, res) => presenceBlueController.create(req, res));
router.put('/:id', (req, res) => presenceBlueController.update(req, res));
router.delete('/:id', (req, res) => presenceBlueController.delete(req, res));

export default router;
