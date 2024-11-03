import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    name: string;
    role: string;
    avatar?: string;
    isOrg?: boolean;
    isFounder?: boolean;
    isManager?: boolean;
  };
}

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg border ${
      data.isOrg ? 'bg-blue-50 border-blue-200' :
      data.isFounder ? 'bg-purple-50 border-purple-200' :
      data.isManager ? 'bg-green-50 border-green-200' :
      'bg-white border-gray-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-300"
      />
      
      <div className="flex items-center">
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.name}
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
        )}
        <div>
          <div className={`font-bold ${
            data.isOrg ? 'text-blue-700' :
            data.isFounder ? 'text-purple-700' :
            data.isManager ? 'text-green-700' :
            'text-gray-700'
          }`}>
            {data.name}
          </div>
          <div className="text-gray-500 text-sm">{data.role}</div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-300"
      />
    </div>
  );
}

export default memo(CustomNode);