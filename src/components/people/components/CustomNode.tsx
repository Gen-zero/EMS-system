import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useNavigate } from '../../../hooks/useNavigate';
import garetIcon from '../../../assets/Garet-1-removebg-preview.png';

interface CustomNodeProps {
  data: {
    label: string;
    role?: string;
    avatar?: string;
    type: 'organization' | 'founder' | 'manager' | 'employee';
    userId?: string;
  };
  isConnectable: boolean;
}

const CustomNode = memo(({ data, isConnectable }: CustomNodeProps) => {
  const { navigateTo } = useNavigate();

  const getNodeStyle = () => {
    switch (data.type) {
      case 'organization':
        return 'bg-indigo-50 border-indigo-200 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all';
      case 'founder':
        return 'bg-purple-50 border-purple-200 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all';
      case 'manager':
        return 'bg-green-50 border-green-200 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all';
      case 'employee':
        return 'bg-gray-50 border-gray-200 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (data.type === 'organization') {
      navigateTo('guild');
    } else if (data.userId) {
      navigateTo('profile', data.userId);
    }
  };

  return (
    <div 
      className={`px-4 py-2 shadow-md rounded-md border ${getNodeStyle()}`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-gray-400"
        isConnectable={isConnectable}
      />
      
      <div className="flex items-center">
        {data.type === 'organization' ? (
          <img
            src={garetIcon}
            alt="Guild Icon"
            className="w-10 h-10 rounded-full mr-2 object-contain"
          />
        ) : data.avatar ? (
          <img
            src={data.avatar}
            alt={data.label}
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
        ) : null}
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          {data.role && (
            <div className="text-xs text-gray-500">{data.role}</div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-gray-400"
        isConnectable={isConnectable}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;