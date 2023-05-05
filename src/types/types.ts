export type Project = {
  id: string;
  name: string;
  description: string;
  client: string;
}

export type Invoice = {
  id: string;
  projectId: string;
  number: string;
  dueDate: string;
  fee: number;
  lineItems: LineItem[];
}

export type LineItem = LineItemByHours | LineItemFixed;

export type LineItemByHours = {
  id: string;
  description: string;
  hours: number;
  rate: number;
  taxRate: number;
}

export type LineItemFixed = {
  id: string;
  description: string;
  fixedPrice: number;
  taxRate: number;
}