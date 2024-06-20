import { Router } from 'express';
import { PresenceWhiteController } from '../controllers/presence_white.controller';

const router = Router();
const presenceWhiteController = new PresenceWhiteController();

router.get('/', (req, res) => presenceWhiteController.findAll(req, res));
router.get('/:id', (req, res) => presenceWhiteController.findByID(req, res));
router.post('/', (req, res) => presenceWhiteController.create(req, res));
router.put('/:id', (req, res) => presenceWhiteController.update(req, res));
router.delete('/:id', (req, res) => presenceWhiteController.delete(req, res));
router.post('/count', (req, res) => presenceWhiteController.count(req, res));

export default router;
