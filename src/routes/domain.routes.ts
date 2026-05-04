// domain.router.ts
import { Router } from 'express';
import { DomainController } from '../controllers/domain.controller';
import { errorHandler } from '../utils/handlers/error.handler';

const router = Router();
const controller = new DomainController();

router.post('/namecheap/add-a', async (req, res, next) => {
  try {
    await controller.addARecordOnNamecheap(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/namecheap/purchase', async (req, res, next) => {
  try {
    await controller.purchaseDomain(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/namecheap/pricing', async (req, res, next) => {
  try {
    await controller.getDomainPricing(req, res);
  } catch (err) {
    next(err);
  }
});


router.use(errorHandler);

export default router;