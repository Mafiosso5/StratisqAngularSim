import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,} from "@angular/common/http";
import {Data} from "./interface" ;

const httpOptions ={
    headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  constructor(private http: HttpClient) { }

  
  result: any;

  //Get all Teachers from api
 public getTeachers(){

    //api returns Object of Object, use interface to open specific object
    return this.http.get<Data>("http://stratisq-001-site1.mysitepanel.net/api/services/app/TeacherService/GetAll", httpOptions);
  }

  //add new Teacher to api DB
  newTeachers(data){

    //send data to the api server of a new Teacher
    return this.http.post("http://stratisq-001-site1.mysitepanel.net/api/services/app/TeacherService/Create", data, httpOptions);

  }

  //Update Teacher Details
  updateTeacher(data){

    return this.http.put("http://stratisq-001-site1.mysitepanel.net/api/services/app/TeacherService/Update",data, httpOptions);
  }


  //Delete Teacher
  deleteTeacher(id){

    //Sending Teacher Id as a parameter to delete
    let param = new HttpParams().set("Id", id)

    return this.http.delete("http://stratisq-001-site1.mysitepanel.net/api/services/app/TeacherService/Delete",{params :param});
  }

}
