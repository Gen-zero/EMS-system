import React, { memo, useState } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      {/* Shadow path for larger hover area */}
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        className="cursor-pointer"
      />
      
      {/* Main edge path */}
      <path
        id={id}
        style={style}
        className={`
          react-flow__edge-path
          transition-all
          duration-300
          ${isHovered ? 'stroke-blue-400 stroke-[3px]' : 'stroke-gray-300 stroke-[2px]'}
        `}
        d={edgePath}
        markerEnd={markerEnd}
      />

      {/* Animated dots */}
      {isHovered && (
        <g>
          <circle
            cx={0}
            cy={0}
            r={4}
            fill="#3b82f6"
            className="animate-flow-dot"
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={edgePath}
            />
          </circle>
        </g>
      )}

      {/* Hover tooltip */}
      {isHovered && (
        <g>
          <rect
            x={(sourceX + targetX) / 2 - 60}
            y={(sourceY + targetY) / 2 - 15}
            width={120}
            height={30}
            rx={6}
            fill="white"
            stroke="#e2e8f0"
            className="shadow-sm"
          />
          <text
            x={(sourceX + targetX) / 2}
            y={(sourceY + targetY) / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-gray-600"
          >
            Click to delete
          </text>
        </g>
      )}
    </g>
  );
};

CustomEdge.displayName = 'CustomEdge';

export default memo(CustomEdge);