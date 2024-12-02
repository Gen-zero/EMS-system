import React from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Settings,
  LogOut,
  Sword,
} from 'lucide-react';
import logoImage from '../assets/GEN0-Logo-color.png';
import iconImage from '../assets/Garet-1-removebg-preview.png';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
  showToggle: boolean;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Guild', icon: Users, id: 'people' },
  { name: 'Tasks', icon: CheckSquare, id: 'tasks' },
  { name: 'Quest Board', icon: Sword, id: 'quests' },
  { name: 'Settings', icon: Settings, id: 'settings', hideOnMobile: true },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isExpanded,
  showToggle,
}: SidebarProps) {
  return (
    <div
      className={`flex h-full flex-col bg-gray-900 text-white transition-all duration-1000 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4 overflow-hidden">
        <img
          src={isExpanded ? logoImage : iconImage}
          alt="Gen0"
          className="transition-all duration-1000 ease-in-out h-14 object-contain"
        />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.id)}
            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-1000 ease-in-out ${
              currentPage === item.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon
              className={`h-5 w-5 flex-shrink-0 transition-all duration-1000 ease-in-out ${
                isExpanded ? 'mr-3' : 'mx-auto'
              }`}
            />
            <span
              className={`whitespace-nowrap transition-all duration-1000 ease-in-out ${
                isExpanded
                  ? 'opacity-100 w-auto'
                  : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button
          className={`flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-1000 ease-in-out`}
        >
          <LogOut
            className={`h-5 w-5 flex-shrink-0 transition-all duration-1000 ease-in-out ${
              isExpanded ? 'mr-3' : 'mx-auto'
            }`}
          />
          <span
            className={`whitespace-nowrap transition-all duration-1000 ease-in-out ${
              isExpanded
                ? 'opacity-100 w-auto'
                : 'opacity-0 w-0 overflow-hidden'
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
