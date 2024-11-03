import { Node, Edge } from 'reactflow';

const STORAGE_KEY = 'org_chart_data';

interface OrgChartData {
  nodes: Node[];
  edges: Edge[];
  lastModified: string;
}

export function saveOrgChartData(nodes: Node[], edges: Edge[]) {
  const data: OrgChartData = {
    nodes,
    edges,
    lastModified: new Date().toISOString()
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save org chart data:', error);
    return false;
  }
}

export function loadOrgChartData(): OrgChartData | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Failed to load org chart data:', error);
    return null;
  }
}

export function clearSavedOrgChartData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear org chart data:', error);
    return false;
  }
}