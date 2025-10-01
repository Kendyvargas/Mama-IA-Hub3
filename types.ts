
export type UrgencyLevel = 'ALTA' | 'MEDIA' | 'BAJA' | 'CRÍTICA';

export interface Prompt {
  id: number;
  category: string;
  tool: string;
  description: string;
  prompt: string;
  timeSaved: string;
  urgency: UrgencyLevel;
  implementation: string;
}
