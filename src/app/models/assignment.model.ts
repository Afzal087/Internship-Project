export interface Assign {
  id: number;
  assignId: string;
  customer: {
    customerId: number;
    customerCode: string;
    name: string;
    email: string;
    location: string;
  };
  employee: {
    employeeId: number;
    employeeCode: string;
    name: string;
    email: string;
    department: string;
    role: string;
  };
  item: {
    itemId: number;
    itemCode: string;
    name: string;
    price: string;
  };
}