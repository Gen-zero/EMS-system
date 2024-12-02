import React from 'react';
import { Users, CheckSquare, Clock, TrendingUp } from 'lucide-react';
import { addDays, formatDate } from '../utils/dateUtils';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const stats = [
  {
    name: 'Total Employees',
    value: '248',
    icon: Users,
    change: '+4.75%',
    color: 'bg-blue-500',
  },
  {
    name: 'Tasks Completed',
    value: '1,429',
    icon: CheckSquare,
    change: '+12.2%',
    color: 'bg-green-500',
  },
  {
    name: 'Avg. Response Time',
    value: '24m',
    icon: Clock,
    change: '-3.4%',
    color: 'bg-yellow-500',
  },
  {
    name: 'Team Performance',
    value: '95.4%',
    icon: TrendingUp,
    change: '+4.1%',
    color: 'bg-purple-500',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const today = new Date();
  const upcomingTasks = [
    {
      id: 1,
      title: 'Review Design Proposals',
      dueDate: addDays(today, 2),
      priority: 'high',
    },
    {
      id: 2,
      title: 'Team Performance Review',
      dueDate: addDays(today, 3),
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Update Documentation',
      dueDate: addDays(today, 5),
      priority: 'low',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, ॐ Manu Narayanaya .
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your team today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`rounded-md ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`ml-2 text-sm ${
                        stat.change.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <img
                  src="/profile.jpg"
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">
                    Completed the quarterly report task
                  </p>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Upcoming Tasks
            </h2>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-4">
                <div
                  className={`h-3 w-3 rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due {formatDate(task.dueDate)}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('tasks')}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
