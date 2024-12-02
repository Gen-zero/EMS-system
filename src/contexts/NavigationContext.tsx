import React, { createContext, useState } from 'react';

interface NavigationContextType {
  currentPage: string;
  previousPage: string;
  profileId: string | null;
  navigateTo: (page: string, profileId?: string) => void;
  goBack: () => void;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState('dashboard');
  const [profileId, setProfileId] = useState<string | null>(null);

  const navigateTo = (page: string, profileId?: string) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    setProfileId(profileId || null);
  };

  const goBack = () => {
    setCurrentPage(previousPage);
    setProfileId(null);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, previousPage, profileId, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}