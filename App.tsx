
import React, { useState, useCallback } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { useInventory } from './hooks/useInventory';
import { AdminPanel } from './components/AdminPanel';
import { Summary } from './components/Summary';
import { SuggestionModal } from './components/SuggestionModal';
import { suggestDailySpecial } from './services/geminiService';
import { Product } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { 
    products, 
    addProduct, 
    updateSales, 
    updateStock, 
    resetSales,
    deleteProduct
  } = useInventory();
  
  const [isSuggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const handleGetSuggestion = async () => {
    setIsLoadingSuggestion(true);
    setSuggestionModalOpen(true);
    try {
      const productsWithHighStock = products.filter(p => p.stock > 10);
      if (productsWithHighStock.length === 0) {
        setSuggestion("No items with high stock to make a suggestion. Add more stock first!");
      } else {
        const result = await suggestDailySpecial(productsWithHighStock);
        setSuggestion(result);
      }
    } catch (error) {
      console.error('Error getting suggestion:', error);
      setSuggestion('Sorry, I could not come up with a suggestion at this time.');
    } finally {
      setIsLoadingSuggestion(false);
    }
  };


  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Summary products={products} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Dashboard 
              products={products} 
              onUpdateSales={updateSales}
              onDeleteProduct={deleteProduct}
            />
          </div>
          <div>
            <AdminPanel 
              onAddProduct={addProduct} 
              onUpdateStock={updateStock}
              products={products}
              onResetSales={resetSales}
              onGetSuggestion={handleGetSuggestion}
              isSuggestionLoading={isLoadingSuggestion}
            />
          </div>
        </div>
      </main>
      <SuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => setSuggestionModalOpen(false)}
        suggestion={suggestion}
        isLoading={isLoadingSuggestion}
      />
    </div>
  );
};

export default App;
