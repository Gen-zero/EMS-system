import { Node, Edge } from 'reactflow';

interface NodeWithLevel extends Node {
  level?: number;
  parentIds?: string[];
}

const VERTICAL_SPACING = 150;  // Space between levels
const MIN_NODE_WIDTH = 250;    // Minimum width of a node
const MIN_HORIZONTAL_SPACING = 30; // Minimum spacing between nodes

export function calculateOptimalLayout(nodes: Node[], edges: Edge[]) {
  const nodeMap = new Map(nodes.map(node => [node.id, { ...node }]));
  const childrenMap = new Map<string, string[]>();
  const parentMap = new Map<string, string[]>();

  // Build relationship maps
  edges.forEach(edge => {
    const { source, target } = edge;
    if (!childrenMap.has(source)) {
      childrenMap.set(source, []);
    }
    if (!parentMap.has(target)) {
      parentMap.set(target, []);
    }
    childrenMap.get(source)?.push(target);
    parentMap.get(target)?.push(source);
  });

  // Assign levels to nodes (BFS)
  const assignLevels = () => {
    const queue: NodeWithLevel[] = [];
    const rootNode = nodes.find(n => !parentMap.get(n.id)?.length);
    if (!rootNode) return;

    const processedNodes = new Map<string, NodeWithLevel>();
    queue.push({ ...rootNode, level: 0 });
    processedNodes.set(rootNode.id, { ...rootNode, level: 0 });

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const children = childrenMap.get(currentNode.id) || [];

      children.forEach(childId => {
        if (!processedNodes.has(childId)) {
          const childNode = nodeMap.get(childId);
          if (childNode) {
            const nodeWithLevel: NodeWithLevel = {
              ...childNode,
              level: (currentNode.level || 0) + 1,
              parentIds: parentMap.get(childId)
            };
            queue.push(nodeWithLevel);
            processedNodes.set(childId, nodeWithLevel);
          }
        }
      });
    }

    return processedNodes;
  };

  // Calculate optimal positions
  const calculatePositions = (nodesWithLevels: Map<string, NodeWithLevel>) => {
    const levelGroups = new Map<number, NodeWithLevel[]>();
    
    // Group nodes by level
    nodesWithLevels.forEach(node => {
      const level = node.level || 0;
      if (!levelGroups.has(level)) {
        levelGroups.set(level, []);
      }
      levelGroups.get(level)?.push(node);
    });

    // Calculate positions level by level
    levelGroups.forEach((levelNodes, level) => {
      const totalWidth = levelNodes.length * MIN_NODE_WIDTH;
      const startX = -(totalWidth / 2);

      levelNodes.forEach((node, index) => {
        const optimalX = startX + (index * (MIN_NODE_WIDTH + MIN_HORIZONTAL_SPACING));
        const optimalY = level * VERTICAL_SPACING;

        // Adjust position based on parent positions if not root
        if (node.parentIds?.length) {
          const parentX = node.parentIds.reduce((sum, parentId) => {
            const parent = nodesWithLevels.get(parentId);
            return sum + (parent?.position.x || 0);
          }, 0) / node.parentIds.length;

          // Weight between optimal position and parent-based position
          const weight = 0.3;
          node.position = {
            x: (optimalX * (1 - weight)) + (parentX * weight),
            y: optimalY
          };
        } else {
          node.position = { x: optimalX, y: optimalY };
        }
      });
    });

    return Array.from(nodesWithLevels.values());
  };

  const nodesWithLevels = assignLevels();
  if (!nodesWithLevels) return nodes;

  return calculatePositions(nodesWithLevels);
}