export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | string;
  state?: 'completed' | 'cancelled' | null;
}
