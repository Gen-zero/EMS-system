import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 550);
      if (width < 550) {
        setIsSidebarExpanded(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {!isSmallScreen && (
        <aside className={`shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'w-64' : 'w-20'
        }`}>
          <Sidebar 
            isExpanded={isSidebarExpanded}
            onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            showToggle={!isSmallScreen}
          />
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          isSidebarExpanded={isSidebarExpanded}
          showToggle={!isSmallScreen}
          isSmallScreen={isSmallScreen}
        />
        <main className={`flex-1 overflow-auto ${isSmallScreen ? 'pb-16' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}