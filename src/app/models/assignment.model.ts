import { Department } from "./Department.model";
import { Employee } from "./employee.model";
import { Organization } from "./Organization.model";
import { Project } from "./Project.model";

export interface Assignment {
  employee: Employee
  deparment : Department;
  project: Project;
  organization: Organization;
  
  }
