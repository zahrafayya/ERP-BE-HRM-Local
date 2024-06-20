import { Router } from 'express';
import { ConfigurationController } from '../controllers/configuration.controller';

const router = Router();
const configurationController = new ConfigurationController();

router.get('/', (req, res) => configurationController.findByID(req, res));
router.put('/:id', (req, res) => configurationController.update(req, res));

export default router;
