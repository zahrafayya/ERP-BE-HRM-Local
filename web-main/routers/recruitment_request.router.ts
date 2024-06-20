import { Router } from 'express';
import { RecruitmentRequestController } from '../controllers/recruitment_request.controller';

const router = Router();
const recruitmentRequestController = new RecruitmentRequestController();

router.get('/', (req, res) => recruitmentRequestController.findAll(req, res));
router.get('/:id', (req, res) => recruitmentRequestController.findByID(req, res));
router.post('/', (req, res) => recruitmentRequestController.create(req, res));
router.put('/:id', (req, res) => recruitmentRequestController.update(req, res));
router.delete('/:id', (req, res) => recruitmentRequestController.delete(req, res));

export default router;
