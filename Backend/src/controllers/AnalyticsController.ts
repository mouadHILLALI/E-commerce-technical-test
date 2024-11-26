import { Request, Response } from 'express';
import { calculateTotalSales, getTopProducts , getSalesPerCategory } from '../services/AnalyticsServices';

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

export const fetchSalesPerCategory = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query; 
  try {
      if (!category) {
          res.status(400).json({
              success: false,
              message: "Category is required.",
          });
          return;
      }

      const salesPerCategory = await getSalesPerCategory(category as string); 
      res.status(200).json({
          success: true,
          message: "Sales data for the specified category retrieved successfully.",
          data: salesPerCategory,
      });
  } catch (error) {
      console.error("Error fetching sales per category:", error);
      res.status(500).json({
          success: false,
          message: "An error occurred while fetching sales per category.",
      });
  }
};