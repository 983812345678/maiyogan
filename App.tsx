
import React, { useState, useCallback } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { useInventory } from './hooks/useInventory';
import { AdminPanel } from './components/AdminPanel';
import { Summary } from './components/Summary';

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
  
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

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
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;