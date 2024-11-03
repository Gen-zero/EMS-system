import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Position,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MOCK_DATA } from './data/mockData';
import CustomNode from './components/CustomNode';
import { calculateOptimalLayout } from './utils/layoutUtils';
import { saveOrgChartData, loadOrgChartData } from './utils/storageUtils';
import { Save, RotateCcw } from 'lucide-react';

const nodeTypes = {
  custom: CustomNode,
};

const createOrgChartData = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeId = 1;

  // Add organization node
  nodes.push({
    id: '0',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { 
      name: MOCK_DATA.organization,
      role: 'Organization',
      isOrg: true
    }
  });

  // Add founders
  MOCK_DATA.founders.forEach((founder, index) => {
    const founderId = nodeId.toString();
    nodes.push({
      id: founderId,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { 
        name: founder.name,
        role: founder.role,
        avatar: founder.avatar,
        isFounder: true
      }
    });
    edges.push({
      id: `e0-${founderId}`,
      source: '0',
      target: founderId,
      type: 'smoothstep'
    });
    nodeId++;
  });

  // Add teams and their members
  MOCK_DATA.teams.forEach((team, teamIndex) => {
    const managerId = nodeId.toString();
    
    // Add manager
    nodes.push({
      id: managerId,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { 
        name: team.manager.name,
        role: team.manager.role,
        avatar: team.manager.avatar,
        isManager: true
      }
    });

    // Connect manager to founder
    edges.push({
      id: `e${Math.floor(teamIndex / 2) + 1}-${managerId}`,
      source: (Math.floor(teamIndex / 2) + 1).toString(),
      target: managerId,
      type: 'smoothstep'
    });

    nodeId++;

    // Add team members
    team.manager.employees?.forEach((employee, empIndex) => {
      const employeeId = nodeId.toString();
      nodes.push({
        id: employeeId,
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { 
          name: employee.name,
          role: employee.role,
          avatar: employee.avatar
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

  // Apply automatic layout
  const optimizedNodes = calculateOptimalLayout(nodes, edges);
  return { nodes: optimizedNodes, edges };
};

function Flow() {
  const savedData = loadOrgChartData();
  const defaultData = createOrgChartData();
  
  const [nodes, setNodes, onNodesChange] = useNodesState(
    savedData?.nodes || defaultData.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    savedData?.edges || defaultData.edges
  );
  const [translateExtent, setTranslateExtent] = useState([[0, 0], [0, 0]]);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  const { getNodes } = useReactFlow();

  const calculateExtent = useCallback(() => {
    const flowNodes = getNodes();
    if (flowNodes.length === 0) return;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    flowNodes.forEach(node => {
      minX = Math.min(minX, node.position.x);
      maxX = Math.max(maxX, node.position.x + 250);
      minY = Math.min(minY, node.position.y);
      maxY = Math.max(maxY, node.position.y + 100);
    });

    const padding = 150;
    setTranslateExtent([
      [minX - padding, minY - padding],
      [maxX + padding, maxY + padding]
    ]);
  }, [getNodes]);

  useEffect(() => {
    setTimeout(calculateExtent, 100);
  }, [calculateExtent]);

  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    const success = saveOrgChartData(nodes, edges);
    setSaveStatus(success ? 'saved' : null);
    
    setTimeout(() => {
      setSaveStatus(null);
    }, 2000);
  }, [nodes, edges]);

  const handleReset = useCallback(() => {
    const { nodes: resetNodes, edges: resetEdges } = createOrgChartData();
    setNodes(resetNodes);
    setEdges(resetEdges);
    calculateExtent();
  }, [setNodes, setEdges, calculateExtent]);

  const onInit = useCallback(() => {
    console.log('Flow initialized');
  }, []);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Strict}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        translateExtent={translateExtent}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls>
          <button
            onClick={handleSave}
            className="react-flow__controls-button"
            title="Save Layout"
          >
            <Save className="w-4 h-4" />
            {saveStatus === 'saved' && (
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Layout saved!
              </div>
            )}
          </button>
          <button
            onClick={handleReset}
            className="react-flow__controls-button"
            title="Reset Layout"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default function PeopleChart() {
  return (
    <ReactFlowProvider>
      <div className="h-full w-full">
        <Flow />
      </div>
    </ReactFlowProvider>
  );
}