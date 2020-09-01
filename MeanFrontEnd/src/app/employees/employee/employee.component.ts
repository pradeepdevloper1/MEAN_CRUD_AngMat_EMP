import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import {Department} from './../../shared/department';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
              private deptservice :DepartmentService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<EmployeeComponent>) { }
  departments:Department[]=[];
  
  ngOnInit(): void {
    this.deptservice.getDepartments().subscribe(DeptList=>{
    this.departments=DeptList;
    });
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

onSubmit(form) {
  if (this.service.form.value._id == null)
    this.insertRecord(this.service.form);
  else
    this.updateRecord(this.service.form);
    this.onClose();
}
onClose(){
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.dialogRef.close();
}
insertRecord(form) {
  form.value['empid']=Math.floor(100000 + Math.random() * 900000);
  this.service.postEmployee(form.value).subscribe(res => {
    this.toastr.success('Inserted successfully', `${form.value['fullName']}  successfully  Registered`);
    this.service.initializeFormGroup();
    this.service.refreshList();
  });
}

updateRecord(form) {
  this.service.putEmployee(form.value).subscribe(res => {
    this.toastr.info('Updated successfully', `${form.value['fullName']} successfully Updated`);
    this.service.initializeFormGroup();
    this.service.refreshList();
  });

}
}
