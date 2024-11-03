import React from 'react';
import { Employee } from '../data/mockData';
import { ConnectorLine } from './ConnectorLine';

interface EmployeeCardProps {
  employee: Employee;
  isFounder?: boolean;
  hasSubordinates?: boolean;
  hasManager?: boolean;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  isFounder = false,
  hasSubordinates = false,
  hasManager = false,
}) => (
  <div className="relative group flex flex-col items-center">
    {/* Top Connector Line - Only show if has manager */}
    {hasManager && (
      <ConnectorLine
        type="vertical"
        className="mb-0"
        hideStartDot={false}
        hideEndDot={true}
      />
    )}

    <div
      className={`flex flex-col items-center p-4 rounded-lg bg-white shadow-md relative transition-all duration-200 group-hover:shadow-lg ${
        isFounder ? 'border-2 border-blue-500' : 'border border-gray-200'
      }`}
    >
      <img
        src={employee.avatar}
        alt={employee.name}
        className="w-16 h-16 rounded-full object-cover mb-2 ring-2 ring-offset-2 ring-gray-100 group-hover:ring-blue-100"
      />
      <h3 className="font-medium text-gray-900">{employee.name}</h3>
      <p className={`text-sm ${isFounder ? 'text-blue-600' : 'text-gray-500'}`}>
        {employee.role}
      </p>
    </div>

    {/* Bottom Connector Line - Only show if has subordinates */}
    {hasSubordinates && (
      <ConnectorLine
        type="vertical"
        className="mt-0"
        hideStartDot={true}
        hideEndDot={false}
      />
    )}
  </div>
);