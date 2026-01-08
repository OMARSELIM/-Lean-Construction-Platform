
export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  responsible: string;
  status: 'pending' | 'completed' | 'delayed';
  delayReason?: string;
  dueDate: string;
  comments?: Comment[];
}

export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

export type AppTab = 'dashboard' | 'planner' | 'advisor' | 'tools' | 'templates' | 'root-cause' | 'waste-detector';
