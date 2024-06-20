import { Router } from 'express';
import { FamilyMemberController } from '../controllers/family_member.controller';

const router = Router();
const familyMemberController = new FamilyMemberController();

router.get('/', (req, res) => familyMemberController.findAll(req, res));
router.get('/:id', (req, res) => familyMemberController.findByID(req, res));
router.get('/emp/:id', (req, res) => familyMemberController.findByEmployeeID(req, res));
router.post('/', (req, res) => familyMemberController.create(req, res));
router.put('/', (req, res) => familyMemberController.update(req, res));
router.delete('/', (req, res) => familyMemberController.delete(req, res));

export default router;
