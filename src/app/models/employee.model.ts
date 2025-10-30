export interface Employee{
     // 🔹 Personal Info
  employeeId?:number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone_no: string;
  email: string;
  aadharNo?:string;
  gender?:string;
  maritalStatus?:string;
  fatherName?:string;

  

  // 🔹 Job Info
  designation: string;
  dateOfJoining: string;
  organization: string;
  position: string;
  workLocation: string;
  department: string;
  manager: string;
  employementType:string;

  // 🔹 Payroll Info
  salary: string; 
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  pfNumber: string;
  panNumber: string;
  currency?:string;
  // 🔹 Address Info
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  buildingNo: string;
  postal_code?:string;

  // 🔹 Documents
  offerLetter: File | null;
  idProof: File | null;
}