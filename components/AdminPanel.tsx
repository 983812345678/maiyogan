import React, { useState } from 'react';
import { Product } from '../types';
import { exportToExcel } from '../services/exportService';

// Modal component for email confirmation
interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: () => void;
  filename: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSendEmail, filename }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full m-4 relative transform transition-all" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center space-x-4 mb-4">
           <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
           </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Report Downloaded</h2>
        </div>
        
        <div className="mt-4 text-slate-600 dark:text-slate-300 space-y-3">
          <p>Your report <code className="font-mono bg-slate-200 dark:bg-slate-700 p-1 rounded text-sm">{filename}</code> has been successfully downloaded.</p>
          <p>Click the button below to open your email client. Remember to attach the file before sending.</p>
        </div>
        
        <div className="mt-6 flex flex-col space-y-2">
            <button onClick={onSendEmail} className="w-full flex justify-center items-center space-x-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>Compose Email to Admin</span>
            </button>
            <button onClick={onClose} className="w-full bg-slate-200 text-slate-800 font-medium py-2 px-4 rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 text-sm">
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};


interface AdminPanelProps {
  onAddProduct: (product: Omit<Product, 'id' | 'sales'>) => void;
  onUpdateStock: (id: string, amount: number) => void;
  products: Product[];
  onResetSales: () => void;
  onGetSuggestion: () => void;
  isSuggestionLoading: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
    onAddProduct, 
    onUpdateStock, 
    products, 
    onResetSales, 
    onGetSuggestion,
    isSuggestionLoading
}) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductWholesale, setNewProductWholesale] = useState('');
  const [newProductOur, setNewProductOur] = useState('');

  const [updateStockId, setUpdateStockId] = useState<string>(products[0]?.id || '');
  const [updateStockAmount, setUpdateStockAmount] = useState('');

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [exportedFilename, setExportedFilename] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = parseInt(newProductStock, 10);
    const wholesaleRate = parseFloat(newProductWholesale);
    const ourRate = parseFloat(newProductOur);
    if (newProductName && newProductCategory && !isNaN(stock) && !isNaN(wholesaleRate) && !isNaN(ourRate)) {
      onAddProduct({ name: newProductName, category: newProductCategory, stock, wholesaleRate, ourRate });
      setNewProductName('');
      setNewProductCategory('');
      setNewProductStock('');
      setNewProductWholesale('');
      setNewProductOur('');
    }
  };

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(updateStockAmount, 10);
    if (updateStockId && !isNaN(amount)) {
      onUpdateStock(updateStockId, amount);
      setUpdateStockAmount('');
    }
  };

  const handleEmailReportClick = () => {
    const filename = exportToExcel(products);
    setExportedFilename(filename);
    setIsEmailModalOpen(true);
  };

  const handleComposeEmail = () => {
    const recipient = 'maiyoganbakery@gmail.com';
    const subject = `Daily Sales Report - ${new Date().toLocaleDateString()}`;
    const body = `Hi Admin,\n\nPlease find the daily sales and inventory report attached.\n\nThank you.`;
    
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsEmailModalOpen(false);
  };


  return (
    <div className="space-y-6">
       <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Daily Actions</h3>
        <div className="space-y-3">
          <div className="text-center">
            <button onClick={handleEmailReportClick} className="w-full flex justify-center items-center space-x-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>Email Daily Report</span>
            </button>
          </div>
           <button onClick={onResetSales} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
             Start New Day (Reset Sales)
           </button>
           <button onClick={onGetSuggestion} disabled={isSuggestionLoading} className="w-full flex justify-center items-center space-x-2 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSuggestionLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
            )}
            <span>Suggest Daily Special</span>
           </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Product Name" value={newProductName} onChange={e => setNewProductName(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"/>
              <input type="text" placeholder="Category" value={newProductCategory} onChange={e => setNewProductCategory(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="Stock" value={newProductStock} onChange={e => setNewProductStock(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"/>
            <input type="number" placeholder="Wholesale ₹" value={newProductWholesale} onChange={e => setNewProductWholesale(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" step="any"/>
            <input type="number" placeholder="Our Rate ₹" value={newProductOur} onChange={e => setNewProductOur(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" step="any"/>
          </div>
          <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5">Add Product</button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Add Stock (Morning Update)</h3>
        <form onSubmit={handleUpdateStock} className="space-y-4">
          <select value={updateStockId} onChange={e => setUpdateStockId(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500">
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="number" placeholder="Amount to Add" value={updateStockAmount} onChange={e => setUpdateStockAmount(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"/>
          <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5">Update Stock</button>
        </form>
      </div>
      <EmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSendEmail={handleComposeEmail}
        filename={exportedFilename}
      />
    </div>
  );
};