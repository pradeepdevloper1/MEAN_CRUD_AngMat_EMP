import { Injectable } from '@angular/core';
import {Department} from './department';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
departmentList:Department[];
  array=[];
  readonly rootURL ="http://localhost:9091/api";
  constructor(private http:HttpClient) { }
  
  refreshList(){
    this.http.get(this.rootURL+'/Departments')
    .toPromise().then(res => this.departmentList = res as Department[]);
  }
  getDepartments(){
    return this.http.get<Department[]>(this.rootURL+'/Departments');
  }
}
