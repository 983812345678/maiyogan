import { useReducer, useEffect, useCallback } from 'react';
import { Product } from '../types';

type InventoryState = {
  products: Product[];
};

type InventoryAction =
  | { type: 'SET_STATE'; payload: InventoryState }
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id' | 'sales'> }
  | { type: 'UPDATE_SALES'; payload: { id: string; sales: number } }
  | { type: 'UPDATE_STOCK'; payload: { id: string; amount: number } }
  | { type: 'RESET_SALES' }
  | { type: 'DELETE_PRODUCT', payload: { id: string } };

const inventoryReducer = (state: InventoryState, action: InventoryAction): InventoryState => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_PRODUCT': {
      const newProduct: Product = {
        id: new Date().toISOString(),
        sales: 0,
        ...action.payload,
      };
      return { ...state, products: [...state.products, newProduct] };
    }
    case 'UPDATE_SALES': {
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? { ...p, sales: action.payload.sales } : p
        ),
      };
    }
    case 'UPDATE_STOCK': {
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? { ...p, stock: p.stock + action.payload.amount } : p
        ),
      };
    }
    case 'RESET_SALES': {
        return {
            ...state,
            products: state.products.map(p => ({...p, sales: 0}))
        }
    }
    case 'DELETE_PRODUCT': {
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload.id)
      }
    }
    default:
      return state;
  }
};

const initialData: Product[] = [
    // Bakery Items
    { id: '1', name: 'Plain Cake', category: 'Bakery', stock: 50, sales: 0, wholesaleRate: 10, ourRate: 15 },
    { id: '2', name: 'Bread', category: 'Bakery', stock: 100, sales: 0, wholesaleRate: 20, ourRate: 30 },
    { id: '3', name: 'Veg Puff', category: 'Bakery', stock: 80, sales: 0, wholesaleRate: 12, ourRate: 20 },
    { id: '4', name: 'Cookies (pack)', category: 'Bakery', stock: 60, sales: 0, wholesaleRate: 40, ourRate: 60 },
    
    // Cigarettes
    { id: 'c1', name: 'Kings', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 180, ourRate: 200 },
    { id: 'c2', name: 'Lights', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 180, ourRate: 200 },
    { id: 'c3', name: 'Mini Gold', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 90, ourRate: 100 },
    { id: 'c4', name: 'Gold Flake', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 180, ourRate: 200 },
    { id: 'c5', name: 'Ice Buster', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 190, ourRate: 210 },
    { id: 'c6', name: 'Classic', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 185, ourRate: 205 },
    { id: 'c7', name: 'Wills', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 100, ourRate: 110 },
    { id: 'c8', name: 'Scissor', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 50, ourRate: 60 },
    { id: 'c9', name: 'Marlboro', category: 'Cigarettes', stock: 20, sales: 0, wholesaleRate: 190, ourRate: 210 },

    // Groceries
    { id: 'g1', name: 'Wheat (1kg)', category: 'Groceries', stock: 30, sales: 0, wholesaleRate: 40, ourRate: 50 },
    { id: 'g2', name: 'Oil (1L)', category: 'Groceries', stock: 25, sales: 0, wholesaleRate: 120, ourRate: 140 },
    { id: 'g3', name: 'Sugar (1kg)', category: 'Groceries', stock: 40, sales: 0, wholesaleRate: 45, ourRate: 55 },
];


export const useInventory = () => {
  const [state, dispatch] = useReducer(inventoryReducer, { products: [] });

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('maiyoganBakeryInventory');
      if (storedState) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
      } else {
        // Load initial data if nothing is in local storage
        dispatch({ type: 'SET_STATE', payload: { products: initialData }});
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
      dispatch({ type: 'SET_STATE', payload: { products: initialData }});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('maiyoganBakeryInventory', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'sales'>) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  }, []);

  const updateSales = useCallback((id: string, sales: number) => {
    dispatch({ type: 'UPDATE_SALES', payload: { id, sales } });
  }, []);

  const updateStock = useCallback((id: string, amount: number) => {
    dispatch({ type: 'UPDATE_STOCK', payload: { id, amount } });
  }, []);

  const resetSales = useCallback(() => {
    dispatch({ type: 'RESET_SALES' });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: { id } });
  }, []);

  return { ...state, addProduct, updateSales, updateStock, resetSales, deleteProduct };
};
