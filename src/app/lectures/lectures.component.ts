import { Component, OnInit } from '@angular/core';
import {LectureServiceService} from '../lecture-service.service';
import { TeacherServiceService } from '../teacher-service.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {


  //View Control
  section = 1;
  edit = false;

  //lecture data
  desc : string = "";
  teacherId: number = 0;
  lectureId: number = 0;
  
  //local storage of Services 
  lecturesDB;
  teachersDB;
  temp;


  constructor(private lecture: LectureServiceService, private teacher: TeacherServiceService) { }

  ngOnInit() {
    this.onGetLectures();
    this.onGetTeachers();
  }

  //View Change
  changeView(sectionId){

    this.section = sectionId;
    this.edit = false;
    this.resetValues();
  }

  //get TeacherID
  getId(id){

    this.lectureId = id;
  }

  //Open Editor
  openEditor(){

    this.edit = true;
  }

  //Reset values of record details
  resetValues(){

    this.desc = "";
    this.lectureId = 0;
    this.teacherId = 0;
  }


  //get All Lectures
  onGetLectures(){

    this.lecture.getLectures().subscribe((data) =>{

      this.temp = data.result;

      this.lecturesDB = this.temp.items;
    });
  }

   //Get all Teachers
   onGetTeachers(){

    this.teacher.getTeachers().subscribe((data)=>{
      //add initial results to temp storage
      this.temp = data.result;

      //open desired object in this case array of items
      this.teachersDB = this.temp.items;
      
    })
  }

  //save new Lecture
  onSaveLecture(){
    
    let obj ={
      description: this.desc,
      teacherId: this.teacherId
    }

    this.lecture.newLecture(obj).subscribe(result =>{

      this.onGetLectures();

    });
  }


  //Select Lecture to update
  onSelectUpdate(id){

    this.openEditor();

    this.desc = id.description;
    this.teacherId = id.teacherId;
  }


  //update Lecture
  onUpdateLecture(){

    let obj ={
      description: this.desc,
      teacherId: this.teacherId,
      id: this.lectureId
    }

    this.lecture.updateLecture(obj).subscribe(result =>{

      this.onGetLectures();
      this.edit = false;
    })
  }

  //Delete Teacher
  onDeleteLecture(){

    let item = this.lectureId;

    this.lecture.deleteLecture(item).subscribe( results =>{
      this.onGetLectures();
  
    });
  }

}
