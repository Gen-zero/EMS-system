import React, { createContext, useContext, useState } from 'react';

interface CategoryContextType {
  categories: string[];
  updateCategories: (newCategories: string[]) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const defaultCategories = [
  'All',
  'Sales',
  'Development',
  'Design',
  'Marketing',
  'HR',
  'Finance',
  'Support'
];

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState(defaultCategories);

  const updateCategories = (newCategories: string[]) => {
    setCategories(newCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, updateCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}