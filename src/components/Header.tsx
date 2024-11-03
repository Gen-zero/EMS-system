import React from 'react';
import { Bell, ChevronLeft, ChevronRight, Settings, LogOut } from 'lucide-react';
import { MOCK_USERS } from '../constants/images';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarExpanded: boolean;
  showToggle: boolean;
  isSmallScreen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarExpanded, showToggle, isSmallScreen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {showToggle && (
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isSidebarExpanded ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </button>
        )}
        {isSmallScreen && (
          <button className="text-gray-600 hover:text-gray-900">
            <LogOut className="h-6 w-6" />
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {isSmallScreen ? (
          <>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <img
                src={MOCK_USERS.user1.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
          </>
        ) : (
          <>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-3">
              <img
                src={MOCK_USERS.user1.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline-block font-medium text-gray-900">{MOCK_USERS.user1.name}</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}