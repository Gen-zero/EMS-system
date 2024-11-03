import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    role?: string;
    avatar?: string;
    type: 'organization' | 'founder' | 'manager' | 'employee';
  };
}

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'organization':
        return 'bg-blue-50 border-blue-200';
      case 'founder':
        return 'bg-purple-50 border-purple-200';
      case 'manager':
        return 'bg-green-50 border-green-200';
      case 'employee':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border ${getNodeStyle()}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-gray-400"
      />
      
      <div className="flex items-center">
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.label}
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
        )}
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
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;