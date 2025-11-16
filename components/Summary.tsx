
import React, { useMemo } from 'react';
import { Product } from '../types';
import { SummaryCard } from './SummaryCard';

interface SummaryProps {
  products: Product[];
}

export const Summary: React.FC<SummaryProps> = ({ products }) => {
  const { totalProfit, totalSalesValue, totalItemsSold } = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const profitPerItem = product.ourRate - product.wholesaleRate;
        acc.totalProfit += profitPerItem * product.sales;
        acc.totalSalesValue += product.ourRate * product.sales;
        acc.totalItemsSold += product.sales;
        return acc;
      },
      { totalProfit: 0, totalSalesValue: 0, totalItemsSold: 0 }
    );
  }, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <SummaryCard 
        title="Today's Profit" 
        value={`₹${totalProfit.toFixed(2)}`}
        icon="profit"
      />
      <SummaryCard 
        title="Today's Sales Value" 
        value={`₹${totalSalesValue.toFixed(2)}`}
        icon="sales"
      />
      <SummaryCard 
        title="Total Items Sold" 
        value={totalItemsSold.toString()}
        icon="items"
      />
    </div>
  );
};
