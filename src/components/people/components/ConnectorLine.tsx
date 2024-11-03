import React from 'react';

interface ConnectorLineProps {
  type: 'vertical' | 'horizontal';
  length?: number;
  className?: string;
  hideStartDot?: boolean;
  hideEndDot?: boolean;
}

export const ConnectorLine: React.FC<ConnectorLineProps> = ({
  type,
  length = 50,
  className = '',
  hideStartDot = false,
  hideEndDot = false,
}) => {
  const dotClasses =
    'w-2 h-2 bg-gray-300 rounded-full transition-colors duration-200 group-hover:bg-blue-300';
  const lineClasses =
    'bg-gray-300 transition-colors duration-200 group-hover:bg-blue-300';

  if (type === 'vertical') {
    return (
      <div className={`flex flex-col items-center group ${className}`}>
        {!hideStartDot && <div className={dotClasses} />}
        <div
          className={`w-px ${lineClasses}`}
          style={{ height: '24px' }}
        />
        {!hideEndDot && <div className={dotClasses} />}
      </div>
    );
  }

  return (
    <div className={`flex items-center group ${className}`}>
      {!hideStartDot && <div className={dotClasses} />}
      <div
        className={`h-px ${lineClasses}`}
        style={{ width: `${length}px` }}
      />
      {!hideEndDot && <div className={dotClasses} />}
    </div>
  );
};