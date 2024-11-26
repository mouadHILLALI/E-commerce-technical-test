import Sale from '../models/Sale';

export const calculateTotalSales = async (): Promise<number> => {
  const result = await Sale.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
  ]);
  return result.length > 0 ? result[0].totalSales : 0;
};

export const getTopProducts = async (): Promise<any[]> => {
  const products = await Sale.aggregate([
    { $group: { _id: '$productId', totalSales: { $sum: '$totalPrice' }, totalQuantity: { $sum: '$quantity' } } },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
  ]);
  return products;
};