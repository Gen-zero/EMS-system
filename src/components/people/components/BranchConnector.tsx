import React from 'react';

interface BranchConnectorProps {
  count: number;
}

export const BranchConnector: React.FC<BranchConnectorProps> = ({ count }) => {
  if (count <= 1) return null;

  return (
    <div className="relative h-8">
      <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-gray-300" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-px h-4 bg-gray-300" />
        ))}
      </div>
    </div>
  );
};