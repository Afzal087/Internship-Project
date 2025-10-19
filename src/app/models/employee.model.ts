export interface Employee{
     // 🔹 Personal Info
     employeeId?:number;
     employeeCode: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone_no: string;
  email: string;

  // 🔹 Job Info
  position: string;
  department: string;
  manager: string;
  joiningDate: string;
  employementType:string;

  // 🔹 Payroll Info
  salary: string;

  accountHolderName:string;
  accountNumber: string
  bankName:string;
  bankAddress:string;
  ifscCode:string;

  // 🔹 Address Info
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  buildingNo: string;

  // 🔹 Documents
  offerLetter: File | null;
  idProof: File | null;
}