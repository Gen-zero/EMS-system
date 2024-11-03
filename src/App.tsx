import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/tasks/TaskList';
import Dashboard from './components/Dashboard';
import PeopleChart from './components/people/PeopleChart';
import MobileNav from './components/MobileNav';
import { CategoryProvider } from './contexts/CategoryContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
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

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <CategoryProvider>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {!isSmallScreen && (
          <aside className={`shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'w-64' : 'w-20'
          }`}>
            <Sidebar 
              currentPage={currentPage} 
              onNavigate={handleNavigate} 
              isExpanded={isSidebarExpanded}
              onToggle={toggleSidebar}
              showToggle={!isSmallScreen}
            />
          </aside>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onToggleSidebar={toggleSidebar}
            isSidebarExpanded={isSidebarExpanded}
            showToggle={!isSmallScreen}
            isSmallScreen={isSmallScreen}
          />
          <main className={`flex-1 overflow-auto ${isSmallScreen ? 'pb-16' : ''}`}>
            {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {currentPage === 'tasks' && <TaskList />}
            {currentPage === 'people' && <PeopleChart />}
          </main>
          {isSmallScreen && (
            <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </CategoryProvider>
  );
}