export interface MetricData {
  name: string;
  value: number;
  label: string;
  trend?: number;
}

export interface SystemNode {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'standby' | 'locked';
  specs: string[];
}

export enum FlightLayer {
  LAYER_01 = 'LAYER_01_DYNAMICS',
  LAYER_02 = 'LAYER_02_METAVERSE'
}