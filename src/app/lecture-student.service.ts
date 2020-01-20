import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"
import {Data} from "./interface";

const httpOptions ={
    headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class LectureStudentService {

  constructor(private http : HttpClient) { }

  //get all Students for a Lecture
  getLectureStudent(){

    return this.http.get<Data>("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureStudentService/GetAll", httpOptions);
  }

  //add new Student to Lecture
  addLectureStudent(data){

    return this.http.post("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureStudentService/Create", data, httpOptions);
  }

  //update Student in Lecture
  updateLectureStudent(data){

    return this.http.put("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureStudentService/Update", data, httpOptions);
  }

  //delete Student in Lecture
  deleteLectureStudent(id){

    let param = new HttpParams().set("Id", id);

    return this.http.delete("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureStudentService/Delete",{params: param});
  }
}
