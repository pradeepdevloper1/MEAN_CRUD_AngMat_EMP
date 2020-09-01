import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Employee } from './employee';
import { Department } from './department';

import { HttpClient } from "@angular/common/http";
import * as _ from  'lodash';
import { DepartmentService } from './department.service';
import { isEmptyExpression } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData  : Employee;
  Emplist : Employee[];
  DeptList:Department[]=[];

  readonly rootURL ="http://localhost:9091/api";
  constructor(private http : HttpClient,private deptService:DepartmentService) { }
  form: FormGroup = new FormGroup({
    __v: new FormControl(),
    _id: new FormControl(),
    empid: new FormControl(),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl('ERP'),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });
  initializeFormGroup() {
    this.form.setValue({
      _id:null,
      __v:null,
      empid: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 'ERP',
      hireDate: '',
      isPermanent: false
    });
  }
  refreshList(){
    this.http.get(this.rootURL+'/Employees')
    .toPromise().then(res => this.Emplist = res as Employee[]);
  }
  getEmployees(){
    return this.http.get<Employee[]>(this.rootURL+'/Employees');
  }
  postEmployee(formData : Employee){
    return this.http.post(this.rootURL+'/Employees',formData);
   }
   putEmployee(formData : Employee){
    return this.http.put(this.rootURL+'/Employees/'+formData._id,formData);
   }

   deleteEmployee(id : string){   
    return this.http.delete(this.rootURL+'/Employees/'+id);
   }
   getDepartmentList(){
    this.deptService.getDepartments().subscribe(dept=>{this.DeptList=dept;
      });   
   }

populateForm(employee){
  var deptcode=this.getDepartmentCode(employee.department);
  if(deptcode==undefined){deptcode='None'}
  
  this.form.setValue({
    _id:`${employee._id}`,
    __v:`${employee.__v}`,
    empid: `${employee.empid}`,
    fullName: `${employee.fullName}`,
    email:`${employee.email}`,
    mobile:`${employee.mobile}`,
    city: `${employee.city}`,
    gender: `${employee.gender}`,
    department: `${deptcode}`,
    hireDate: `${employee.hireDate}`,
    isPermanent: employee.isPermanent
  });
}

public  getDepartmentCode(deptname):string{
  this.getDepartmentList();
  var tempdeptList=this.DeptList;
   for(let i=0;i<this.DeptList.length;i++){
    if(deptname==tempdeptList[i].name)
      return tempdeptList[i].code;
    
  }
  }
}
