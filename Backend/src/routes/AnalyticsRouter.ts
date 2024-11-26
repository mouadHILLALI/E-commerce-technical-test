import express from 'express';
import { getTotalSales, getTopSellingProducts } from '../controllers/AnalyticsController';

const router = express.Router();

router.get('/total_sales', getTotalSales);
router.get('/trending_products', getTopSellingProducts);

export default router;
