export type Patient = {
  id: number;
  name: string;
  risk: "low" | "medium" | "high";
  pending: boolean;
  diagnosed: boolean;
};
