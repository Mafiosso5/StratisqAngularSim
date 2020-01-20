import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"
import {Data} from "./interface";

const httpOptions ={
    headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  //get all Students
  getStudents(){

    //<Data> interface to extract results 
    return this.http.get<Data>("http://stratisq-001-site1.mysitepanel.net/api/services/app/StudentService/GetAll",httpOptions);
  }

  //Add new Student
  addStudent(data){

    return this.http.post("http://stratisq-001-site1.mysitepanel.net/api/services/app/StudentService/Create",data, httpOptions);
  }

  //update Student details
  updateStudent(data){

    return this.http.put("http://stratisq-001-site1.mysitepanel.net/api/services/app/StudentService/Update",data, httpOptions);
  }

  //delete Student
  deleteStudent(id){

    let param = new HttpParams().set("Id", id);

    return this.http.delete("http://stratisq-001-site1.mysitepanel.net/api/services/app/StudentService/Delete", {params: param});
  }
}
