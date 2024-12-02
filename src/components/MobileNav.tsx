import React from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Sword
} from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'People', icon: Users, id: 'people' },
  { name: 'Tasks', icon: CheckSquare, id: 'tasks' },
  { name: 'Quests', icon: Sword, id: 'quests' },
];

export default function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center ${
              currentPage === item.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}