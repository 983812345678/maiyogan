import React from 'react';
import { Product } from '../types';

interface DashboardProps {
  products: Product[];
  onUpdateSales: (id: string, sales: number) => void;
  onDeleteProduct: (id:string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ products, onUpdateSales, onDeleteProduct }) => {

  const handleSalesChange = (id: string, value: string, stock: number) => {
    const sales = parseInt(value, 10);
    if (!isNaN(sales) && sales >= 0) {
        // Ensure sales don't exceed available stock
        onUpdateSales(id, Math.min(sales, stock));
    } else if (value === '') {
        onUpdateSales(id, 0);
    }
  };

  const calculateProfit = (product: Product) => {
    return (product.ourRate - product.wholesaleRate) * product.sales;
  };

  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Daily Inventory & Sales</h2>
      <div className="overflow-x-auto max-h-[calc(100vh-250px)]">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3 text-center">Stock</th>
              <th scope="col" className="px-6 py-3 text-center">Sales</th>
              <th scope="col" className="px-6 py-3 text-center">Wholesale Rate</th>
              <th scope="col" className="px-6 py-3 text-center">Our Rate</th>
              <th scope="col" className="px-6 py-3 text-center">Profit</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
                <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-500 dark:text-slate-400">
                        No products in inventory. Add products using the Admin Panel.
                    </td>
                </tr>
            ) : (
                sortedCategories.map(category => (
                  <React.Fragment key={category}>
                    <tr className="bg-slate-100 dark:bg-slate-700/50">
                      <th colSpan={7} className="px-6 py-2 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wider">
                        {category}
                      </th>
                    </tr>
                    {groupedProducts[category].map(product => (
                      <tr key={product.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50">
                          <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                          {product.name}
                          </th>
                          <td className="px-6 py-4 text-center">{product.stock - product.sales}</td>
                          <td className="px-6 py-4 text-center">
                          <input
                              type="number"
                              className="w-20 text-center bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              value={product.sales}
                              onChange={(e) => handleSalesChange(product.id, e.target.value, product.stock)}
                              min="0"
                              max={product.stock}
                          />
                          </td>
                          <td className="px-6 py-4 text-center">₹{product.wholesaleRate.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center">₹{product.ourRate.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center font-semibold text-green-600 dark:text-green-400">
                          ₹{calculateProfit(product).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-center">
                              <button 
                                  onClick={() => onDeleteProduct(product.id)}
                                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                  aria-label={`Delete ${product.name}`}
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                              </button>
                          </td>
                      </tr>
                      ))
                    }
                  </React.Fragment>
                ))
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
};
