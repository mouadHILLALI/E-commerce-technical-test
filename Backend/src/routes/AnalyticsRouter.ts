import express from 'express';
import { getTotalSales, getTopSellingProducts  , fetchSalesPerCategory} from '../controllers/AnalyticsController';

const router = express.Router();

router.get('/total_sales', getTotalSales);
router.get('/trending_products', getTopSellingProducts);
router.get("/sales-per-category", fetchSalesPerCategory);

export default router;
