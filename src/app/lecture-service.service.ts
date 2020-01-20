import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"
import {Data} from "./interface";

const httpOptions ={
    headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class LectureServiceService {

  constructor(private http: HttpClient) { }

 
//Get all Lectures
  getLectures(){

    return this.http.get<Data>("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureService/GetAll", httpOptions);
  }

  //add new Lecture
  newLecture(data){

    return this.http.post("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureService/Create", data, httpOptions);

  }

  //update Lecture Details
  updateLecture(data){

    return this.http.put("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureService/Update", data, httpOptions);
  }

  //delete Lecture
  deleteLecture(id){

    let param = new HttpParams().set("Id", id);

    return this.http.delete("http://stratisq-001-site1.mysitepanel.net/api/services/app/LectureService/Delete", {params : param});

  }

}
