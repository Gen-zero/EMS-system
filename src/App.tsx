import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/tasks/TaskList';
import Dashboard from './components/Dashboard';
import PeopleChart from './components/people/PeopleChart';
import QuestBoard from './components/quests/QuestBoard';
import MobileNav from './components/MobileNav';
import ProfilePage from './components/profile/ProfilePage';
import GuildPage from './components/guild/GuildPage';
import { CategoryProvider } from './contexts/CategoryContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useNavigate } from './hooks/useNavigate';
import { Task } from './types';

export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const AppContent = () => {
    const { currentPage, navigateTo, profileId } = useNavigate();
    
    const handleQuestAccepted = (newTask: Task) => {
      setTasks(prevTasks => [...prevTasks, newTask]);
      navigateTo('tasks');
    };

    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {!isSmallScreen && (
          <aside className={`shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'w-64' : 'w-20'
          }`}>
            <Sidebar 
              currentPage={currentPage} 
              onNavigate={navigateTo}
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
            {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
            {currentPage === 'tasks' && <TaskList initialTasks={tasks} onTasksChange={setTasks} />}
            {currentPage === 'people' && <PeopleChart />}
            {currentPage === 'quests' && <QuestBoard onQuestAccepted={handleQuestAccepted} />}
            {currentPage === 'profile' && <ProfilePage profileId={profileId} />}
            {currentPage === 'guild' && <GuildPage />}
          </main>
          {isSmallScreen && (
            <MobileNav currentPage={currentPage} onNavigate={navigateTo} />
          )}
        </div>
      </div>
    );
  };

  return (
    <NavigationProvider>
      <NotificationProvider>
        <CategoryProvider>
          <AppContent />
        </CategoryProvider>
      </NotificationProvider>
    </NavigationProvider>
  );
}