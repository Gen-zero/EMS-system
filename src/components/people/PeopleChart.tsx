import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useReactFlow,
  Node,
  Edge,
  NodeTypes,
  XYPosition,
  useNodesState,
  useEdgesState,
  Connection,
  EdgeTypes,
  Viewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ZoomIn, ZoomOut, Lock, Unlock, Save, RotateCcw, Link, Unlink } from 'lucide-react';
import CustomNode from './components/CustomNode';
import CustomEdge from './components/CustomEdge';
import Modal from '../common/Modal';
import { createOrgChartData } from './utils/layoutUtils';
import { saveOrgChartData, loadOrgChartData } from './utils/storageUtils';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const DRAG_BOUNDS = 150;

const Flow = () => {
  const { fitView, zoomIn, zoomOut, getNode, setViewport, getViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ minX: -DRAG_BOUNDS, maxX: DRAG_BOUNDS, minY: -DRAG_BOUNDS, maxY: DRAG_BOUNDS });
  const lastViewportRef = useRef<Viewport | null>(null);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [edgeToDelete, setEdgeToDelete] = useState<Edge | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  // Calculate bounds based on node positions
  const calculateBounds = useCallback((nodes: Node[]) => {
    if (nodes.length === 0) return;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    nodes.forEach((node) => {
      minX = Math.min(minX, node.position.x);
      maxX = Math.max(maxX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxY = Math.max(maxY, node.position.y);
    });

    setBounds({
      minX: minX - DRAG_BOUNDS,
      maxX: maxX + DRAG_BOUNDS,
      minY: minY - DRAG_BOUNDS,
      maxY: maxY + DRAG_BOUNDS,
    });
  }, []);

  useEffect(() => {
    const savedLayout = loadOrgChartData();
    if (savedLayout) {
      setNodes(savedLayout.nodes);
      setEdges(savedLayout.edges.map(edge => ({ ...edge, type: 'custom' })));
      calculateBounds(savedLayout.nodes);
    } else {
      const { nodes: initialNodes, edges: initialEdges } = createOrgChartData();
      setNodes(initialNodes);
      setEdges(initialEdges.map(edge => ({ ...edge, type: 'custom' })));
      calculateBounds(initialNodes);
    }
  }, [setNodes, setEdges, calculateBounds]);

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 200 });
      }, 100);
    }
  }, []); // Only run once on initial load

  const handleSaveLayout = useCallback(() => {
    const success = saveOrgChartData(nodes, edges);
    setSaveSuccess(success);
    setShowSaveModal(true);
  }, [nodes, edges]);

  const handleResetLayout = useCallback(() => {
    const { nodes: resetNodes, edges: resetEdges } = createOrgChartData();
    setNodes(resetNodes);
    setEdges(resetEdges.map(edge => ({ ...edge, type: 'custom' })));
    calculateBounds(resetNodes);
    fitView({ padding: 0.2, duration: 200 });
  }, [setNodes, setEdges, calculateBounds, fitView]);

  const onNodeDragStart = useCallback(() => {
    // Store the current viewport when starting to drag
    lastViewportRef.current = getViewport();
  }, [getViewport]);

  const onNodeDrag = useCallback(() => {
    // Restore the viewport during drag to prevent auto-centering
    if (lastViewportRef.current) {
      setViewport(lastViewportRef.current);
    }
  }, [setViewport]);

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const updatedNode = getNode(node.id);
      if (!updatedNode) return;

      const newPos: XYPosition = {
        x: Math.max(bounds.minX, Math.min(bounds.maxX, updatedNode.position.x)),
        y: Math.max(bounds.minY, Math.min(bounds.maxY, updatedNode.position.y)),
      };

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              position: newPos,
            };
          }
          return n;
        })
      );

      // Clear the stored viewport
      lastViewportRef.current = null;
    },
    [bounds, getNode, setNodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source === params.target) return;

      const connectionExists = edges.some(
        edge => edge.source === params.source && edge.target === params.target
      );

      if (!connectionExists) {
        setEdges((eds) => eds.concat({ 
          ...params, 
          id: `e${params.source}-${params.target}`,
          type: 'custom'
        }));
      }
    },
    [edges, setEdges]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      setEdgeToDelete(edge);
      setShowDeleteModal(true);
    },
    []
  );

  const handleDeleteEdge = useCallback(() => {
    if (edgeToDelete) {
      setEdges((eds) => eds.filter((e) => e.id !== edgeToDelete.id));
      setEdgeToDelete(null);
    }
    setShowDeleteModal(false);
  }, [edgeToDelete, setEdges]);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        preventScrolling
        nodesDraggable={!isLocked}
        nodesConnectable={isConnecting}
        elementsSelectable={!isLocked}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2 z-50">
          <button
            onClick={() => zoomIn()}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => zoomOut()}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title={isLocked ? "Unlock Layout" : "Lock Layout"}
          >
            {isLocked ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsConnecting(!isConnecting)}
            className={`p-2 hover:bg-gray-100 rounded-lg ${
              isConnecting ? 'bg-blue-100' : ''
            }`}
            title={isConnecting ? "Stop Connecting" : "Start Connecting"}
          >
            {isConnecting ? (
              <Unlink className="w-4 h-4" />
            ) : (
              <Link className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleSaveLayout}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Save Layout"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetLayout}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Reset Layout"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </ReactFlow>

      {/* Delete Connection Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setEdgeToDelete(null);
        }}
        title="Delete Connection"
        actions={
          <>
            <button
              onClick={handleDeleteEdge}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setEdgeToDelete(null);
              }}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this connection? This action cannot be undone.
        </p>
      </Modal>

      {/* Save Layout Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => {
          setShowSaveModal(false);
          setSaveSuccess(null);
        }}
        title={saveSuccess ? "Success" : "Error"}
        actions={
          <button
            onClick={() => {
              setShowSaveModal(false);
              setSaveSuccess(null);
            }}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        }
      >
        <p className="text-sm text-gray-500">
          {saveSuccess
            ? "Layout saved successfully!"
            : "Failed to save layout. Please try again."}
        </p>
      </Modal>
    </div>
  );
};

export default function PeopleChart() {
  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}