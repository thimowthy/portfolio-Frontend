
export type Patient = {
  id: number;
  name: string;
  risk: 'low' | 'medium' | 'high';
  pending: boolean; // True if patient has pending items, false otherwise
  diagnosed: boolean; // True if diagnosed with a disease, false otherwise
};
