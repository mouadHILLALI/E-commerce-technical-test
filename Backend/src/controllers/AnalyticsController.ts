import { Request, Response } from 'express';
import { calculateTotalSales, getTopProducts } from '../services/AnalyticsServices';

export const getTotalSales = async (req: Request, res: Response) => {
  try {
    const totalSales = await calculateTotalSales();
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating total sales' });
  }
};

export const getTopSellingProducts = async (req: Request, res: Response) => {
  try {
    const products = await getTopProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving top products' });
  }
};
