import { ExtraFields } from './extraFields.model';
export interface Employee extends ExtraFields {
  employeeId?: number;
  employeeCode?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  phone_no?: string;
  email?: string;
  aadharNo?: string;
  gender?: string;
  maritalStatus?: string;
  fatherName?: string;
  country?: string;
  countryCode?: string;
  state?: string;
  city?: string;
  street?: string;
  buildingNo?: string;
  postal_code?: string;
  permanent_country?: string;
  permanent_countryCode?: string;
  permanent_state?: string;
  permanent_city?: string;
  permanent_street?: string;
  permanent_buildingNo?: string;
  permanent_postal_code?: string;
  designation?: string;
  dateOfJoining?: string;
  organization?: string;
  DeductionRate?: string;
  deductionAmount?: string;
  netSalary?: string;
  workLocation?: string;
  department?: string;
  ESIContribution?: string;
  epfEligible?: string;
  tds?: string;
  manager?: string;
  employementType?: string;
  offerLetter?: File | null;
  idProof?: File | null;
  salary?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  pfNumber?: string;
  panNumber?: string;
  currency?: string;
  isAddressDifferent?: boolean;
}

export interface EmployeeWithLeaves {
  employee: Employee;
  leaves: LeaveRequest[];
}
export interface FamilyMember {
  relation: string;
  memberName: string;
}

export interface LeaveRequest {
  employeeId: number;
  leaveId: number;
  requestType: string;
  fromDate: string;
  toDate: string;
  backupPerson: string;
  emergencyContact: string;
  requestReason: string;
  destination?: string;
  transportMode?: string;
  familyMembers?: FamilyMember[];
}

export interface UnifiedAllLeaves{
      leaveId :number;
      employeeId: number;
      requestType: string;
      fromDate: string;
      toDate: string;
      backupPerson: string;
      emergencyContact: string;
      requestReason: string;
}