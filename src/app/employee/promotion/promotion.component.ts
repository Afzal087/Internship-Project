import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

export interface PromotionHistory {
  employeeId?: string;
  designation: string;
  salary: string;
  newRole: string;
  newSalary: string;
  promotionDate: string;
  description: string;
}

@Component({
  selector: 'promotion-component',
  standalone: true,
  templateUrl: './promotion.component.html',
  imports : [CommonModule,ReactiveFormsModule, FormsModule],
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
 
  
  constructor(private fb: FormBuilder, private employeeService : EmployeeService ,private route :ActivatedRoute, private router : Router ) {}
  routeId : number = 0 ;
  allEmployee : Employee[] = []
  isEligble: string = ''; 
  promotionHistory : Employee[] = [];
  updateInfo : Employee= {
      employeeId: this.routeId,
      designation: ''  ,
      salary: '',
      newRole: '' ,
      newSalary: '',
      promotionDate: '',
      description: '',
      DeductionRate: '',
      ESIContribution: '',
      tds: '',
      netSalary: '',
      deductionAmount: ''
  }


  ngOnInit(): void {
    this.employeeService.employee$.subscribe((data) => {
      this.allEmployee = data;
      this.findEmployeeById();
    });
  }

  findEmployeeById(){
    this.routeId = Number(this.route.snapshot.paramMap.get('employeeId'));
    const Emp = this.allEmployee.find(emp => emp.employeeId == Number(this.routeId));
    console.log('Found Employee:', Emp);
    if (Emp) {
      this.updateInfo = Emp;
    }
  }

  handleSubmit(): void {
    console.log('Submitting promotion data:', this.updateInfo);
    // Add your API call or save logic here
  }
   
   CheckEligble(value: string) {
    if (value === 'Yes') {
      this.isEligble = 'Yes';
      this.updateInfo.DeductionRate = '1800';
      this.calcSalary();
    } else {
      this.isEligble = 'No';
      this.updateInfo.DeductionRate = '';
      this.calcTDS();
    }
  }

  calcTDS(){
    const salary = Number(this.updateInfo.newSalary) || 0;
    const annualSalary = salary * 12;

    let tdsRate = 0; // default 0%

    if (annualSalary <= 300000) {
      tdsRate = 0;
    } else if (annualSalary <= 600000) {
      tdsRate = 0.05;
    } else if (annualSalary <= 900000) {
      tdsRate = 0.10;
    } else if (annualSalary <= 1200000) {
      tdsRate = 0.15;
    } else if (annualSalary <= 1500000) {
      tdsRate = 0.20;
    } else {
      tdsRate = 0.30;
    }

    const esi = salary <= 21000 ? salary * 0.0075 : 0;
    const annualTds = annualSalary * tdsRate;
    const epf = this.isEligble === 'Yes' ? 1800 : 0;
    const tds = annualTds / 12;
    this.updateInfo.tds = String(tds.toFixed(2));
    this.updateInfo.ESIContribution = String(esi.toFixed(2));
    this.updateInfo.netSalary = String((salary - tds - esi - epf).toFixed(2));
    this.updateInfo.deductionAmount = String((tds + esi + epf).toFixed(2));

    
    return tds;
  }

  calcSalary() {
    const salary = Number(this.updateInfo.newSalary) || 0;
    const tds = this.calcTDS();
    const esi = salary <= 21000 ? salary * 0.0075 : 0;
    const epf = this.isEligble === 'Yes' ? 1800 : 0;
    
    this.updateInfo.ESIContribution = String(esi.toFixed(2));
    this.updateInfo.netSalary = String((salary - tds - esi - epf).toFixed(2));
    this.updateInfo.deductionAmount = String((tds + esi + epf).toFixed(2));
  }

  

}
