export interface SystemStatus {
  backendConnected: boolean;
  plcConnected: boolean;
  mode: 'SIMULATION' | 'PLC';
  lineName: string;
}

export type BinStatusType = 'NORMAL' | 'WARNING' | 'FULL';

export interface BinData {
  id: string;
  name: string;
  productType: string;
  current: number;
  capacity: number;
  remaining: number;
  fillPercent: number;
  status: BinStatusType;
}

export interface ChartDataPoint {
  time: string;
  binA: number;
  binB: number;
  binC: number;
  binD: number;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface MockDataType {
  system: SystemStatus;
  totalToday: number;
  bins: BinData[];
  chartData: ChartDataPoint[];
  logs: ActivityLogItem[];
}

export const mockSortingData: MockDataType = {
  system: {
    backendConnected: true,
    plcConnected: false,
    mode: 'SIMULATION',
    lineName: 'Automatic Sorting Line',
  },
  totalToday: 428,
  bins: [
    {
      id: 'bin-a',
      name: 'BIN A',
      productType: 'Type A',
      current: 35,
      capacity: 50,
      remaining: 15,
      fillPercent: 70,
      status: 'NORMAL',
    },
    {
      id: 'bin-b',
      name: 'BIN B',
      productType: 'Type B',
      current: 12,
      capacity: 50,
      remaining: 38,
      fillPercent: 24,
      status: 'NORMAL',
    },
    {
      id: 'bin-c',
      name: 'BIN C',
      productType: 'Type C',
      current: 48,
      capacity: 50,
      remaining: 2,
      fillPercent: 96,
      status: 'WARNING',
    },
    {
      id: 'bin-d',
      name: 'BIN D',
      productType: 'Type D',
      current: 50,
      capacity: 50,
      remaining: 0,
      fillPercent: 100,
      status: 'FULL',
    },
  ],
  chartData: [
    { time: '10:00', binA: 20, binB: 10, binC: 30, binD: 40 },
    { time: '11:00', binA: 35, binB: 14, binC: 55, binD: 65 },
    { time: '12:00', binA: 45, binB: 18, binC: 70, binD: 85 },
    { time: '13:00', binA: 60, binB: 20, binC: 85, binD: 95 },
    { time: '14:00', binA: 70, binB: 24, binC: 96, binD: 100 },
  ],
  logs: [
    { id: '1', timestamp: '21:30:12', message: 'Bin D is full (capacity 50/50 reached)', type: 'error' },
    { id: '2', timestamp: '21:30:10', message: 'Product B detected at Optical Sensor', type: 'info' },
    { id: '3', timestamp: '21:30:07', message: 'Bin C reached warning threshold 90%', type: 'warning' },
    { id: '4', timestamp: '21:30:03', message: 'Product A routed to Bin A successfully', type: 'success' },
    { id: '5', timestamp: '21:30:02', message: 'Product A detected at Feeder Input', type: 'info' },
    { id: '6', timestamp: '21:29:45', message: 'Conveyor line speed stabilized at 1.2 m/s', type: 'info' },
    { id: '7', timestamp: '21:28:10', message: 'Simulation cycle initialized', type: 'info' },
  ],
};
