
export interface User {
  id: string;
  email: string;
  password: string; // Note: In a real app, we'd never store plain passwords
  name: string;
  role: 'admin' | 'user';
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerId: string;
}

export interface Appointment {
  id: string;
  petId: string;
  userId: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}
