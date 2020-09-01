import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { ToastrService } from 'ngx-toastr';

import { Employee } from '../../shared/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department } from 'src/app/shared/department';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   searchKey:string;

    // Important objects
  MyDataSource: any;
  employeeList: Employee[];
  deptList:Department[];
  displayedColumns: string[] = ['empid','fullName', 'email','mobile','city','gender','department','hireDate','isPermanent','actions'];
 
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  constructor(private empservice:EmployeeService,
    private deptservice:DepartmentService, 
    private router: Router,
    private dialog:MatDialog,
    private toastr:ToastrService) { }
 
  ngOnInit(): void { 
   this.refreshList();
    }

    refreshList(){
      this.getDepartments();
      this.getEmployees();
    }
    onCreate(){
      this.empservice.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      let dialogRef =   this.dialog.open(EmployeeComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {  
        this.refreshList();       
      });  
      
    }
    onEdit(row){
      this.empservice.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      let dialogRef = this.dialog.open(EmployeeComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {  
        this.refreshList();       
      });  
    }
    onDelete(row){
      if (confirm('Are you sure to delete this record?')) {
      this.empservice.deleteEmployee(row._id).subscribe(res=>{
        this.refreshList();
        this.toastr.warning('Deleted successfully', `${row.fullName}  Deleted successfully  `);
      }); 
    }     
    }

 // To Get List Of Employee
 getEmployees() {
      this.empservice
      .getEmployees()
      .subscribe((data: Employee[]) => {
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = data;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
      for(let i=0;i<this.MyDataSource.data.length;i++){
        this.MyDataSource.data[i].department=this.getDepartmentname(this.MyDataSource.data[i].department);
        }    
      });
  }

  getDepartmentname(deptcode):string{
    var tempdeptList=this.deptList;
     for(let i=0;i<tempdeptList.length;i++){
      if(deptcode==tempdeptList[i].code)
        return tempdeptList[i].name;
      }
  }

  getDepartments(){
    this.deptservice.getDepartments().subscribe(
    dept=>{ this.deptList=dept;       
          });
    }

   // Search specific result
 filterEmployee(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
    }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.MyDataSource.filter=this.searchKey.trim().toLowerCase();
  }
} 
