export interface Assign {
  id: number;
  assignId: string;
  customer: {
    customerId: Number,
    customerCode : String,
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    countryCode: String,
    street:String,
    phone_no:String,
    buildingNo:String,
    gender:String,
    dob:String,
    city:String,
    state:String,
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