import { Node, Edge } from 'reactflow';

const STORAGE_KEY = 'org-chart-layout';

export const saveOrgChartData = (nodes: Node[], edges: Edge[]): boolean => {
  try {
    const data = { nodes, edges };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving org chart data:', error);
    return false;
  }
};

export const loadOrgChartData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading org chart data:', error);
    return null;
  }
};