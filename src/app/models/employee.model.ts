export interface Employee{
     // 🔹 Personal Info
  employeeId?:number;
  employeeCode?: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone_no: string;
  email: string;
  aadharNo?:string;
  gender?:string;
  maritalStatus?:string;
  fatherName?:string;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  buildingNo: string;
  postal_code?:string;
  designation: string;
  dateOfJoining: string;
  organization: string;
  DeductionRate: string;
  deductionAmount:string;
  netSalary:string;
  workLocation: string;
  department: string;
  manager: string;
  employementType:string;
  offerLetter: File | null;
  idProof: File | null;
  salary: string; 
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  pfNumber: string;
  panNumber: string;
  currency?:string;


 
}