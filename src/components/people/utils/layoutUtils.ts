import { Node, Edge } from 'reactflow';
import { MOCK_DATA } from '../data/mockData';

interface Position {
  x: number;
  y: number;
}

export const calculateOptimalLayout = (nodes: Node[]): Node[] => {
  const HORIZONTAL_SPACING = 250;
  const VERTICAL_SPACING = 150;
  const NODE_WIDTH = 200;
  const NODE_HEIGHT = 80;
  const MIN_MARGIN = 30;

  const levels: { [key: string]: Node[] } = {};

  // Group nodes by levels (y-position)
  nodes.forEach(node => {
    const level = Math.round(node.position.y / VERTICAL_SPACING);
    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(node);
  });

  // Adjust positions for each level
  Object.keys(levels).forEach(levelKey => {
    const levelNodes = levels[levelKey];
    const level = parseInt(levelKey);
    const totalWidth = levelNodes.length * (NODE_WIDTH + MIN_MARGIN);
    let startX = -(totalWidth / 2);

    levelNodes.forEach((node, index) => {
      node.position = {
        x: startX + index * (NODE_WIDTH + MIN_MARGIN),
        y: level * VERTICAL_SPACING
      };
    });
  });

  return nodes;
};

export const createOrgChartData = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeId = 1;

  // Add organization node
  nodes.push({
    id: '0',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { 
      label: MOCK_DATA.organization,
      type: 'organization'
    }
  });

  // Add founder nodes
  MOCK_DATA.founders.forEach((founder, index) => {
    const id = nodeId.toString();
    const xOffset = index === 0 ? -200 : 200;
    
    nodes.push({
      id,
      type: 'custom',
      position: { x: xOffset, y: 100 },
      data: {
        label: founder.name,
        role: founder.role,
        avatar: founder.avatar,
        type: 'founder'
      }
    });

    edges.push({
      id: `e0-${id}`,
      source: '0',
      target: id,
      type: 'smoothstep'
    });

    nodeId++;
  });

  // Add team nodes
  MOCK_DATA.teams.forEach((team, teamIndex) => {
    const managerId = nodeId.toString();
    const xOffset = (teamIndex - 1) * 400;
    
    // Add manager node
    nodes.push({
      id: managerId,
      type: 'custom',
      position: { x: xOffset, y: 250 },
      data: {
        label: team.manager.name,
        role: team.manager.role,
        avatar: team.manager.avatar,
        type: 'manager'
      }
    });

    // Connect to both founders
    MOCK_DATA.founders.forEach((_, founderIndex) => {
      edges.push({
        id: `e${founderIndex + 1}-${managerId}`,
        source: (founderIndex + 1).toString(),
        target: managerId,
        type: 'smoothstep'
      });
    });

    nodeId++;

    // Add employee nodes
    team.manager.employees?.forEach((employee, empIndex) => {
      const employeeId = nodeId.toString();
      const empXOffset = xOffset + (empIndex - 0.5) * 200;
      
      nodes.push({
        id: employeeId,
        type: 'custom',
        position: { x: empXOffset, y: 400 },
        data: {
          label: employee.name,
          role: employee.role,
          avatar: employee.avatar,
          type: 'employee'
        }
      });

      edges.push({
        id: `e${managerId}-${employeeId}`,
        source: managerId,
        target: employeeId,
        type: 'smoothstep'
      });

      nodeId++;
    });
  });

  return { nodes: calculateOptimalLayout(nodes), edges };
};