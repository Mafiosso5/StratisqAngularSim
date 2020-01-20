import { Component, OnInit } from '@angular/core';
import {LectureServiceService} from '../lecture-service.service';
import { TeacherServiceService } from '../teacher-service.service';
import {StudentService} from "../student.service";
import {LectureStudentService} from "../lecture-student.service"
import {Student} from "../student";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  addNew = false;
  addNewLect = false;
  selected= false;
  lectureName  ="";

  //lecture data
  desc : string = "";
  teacherId: number = 0;

  //lecture Student data
  lectureId: number = 0;
  studentId: number = 0;
  lectureStudentId: number = 0;
  
  //local storage of Services 
  lecturesDB;
  teachersDB;
  studentsDB;
  lectureStudentDB;
  temp;



  constructor(private lecture: LectureServiceService,
              private teacher: TeacherServiceService,
              private student :StudentService,
              private lectureStudent: LectureStudentService) { }

  ngOnInit() {
    this.onGetLectures();
    this.onGetTeachers();
    this.onGetStudents();
    this.onGetLectureStudent();

    
  }


  /* 
    View Control Methods
  */

  //opens extra menus after selecting a Lecture
  openMenu(lectureId,lectureName){

    this.lectureName = lectureName;
    this.lectureId = lectureId;
    this.selected = true;
  }

  //opens additional options
  openAddMenu(){

    this.addNew = true;
    this.selected = false;
    this.resetValues();
  }

  openAddLectMenu(){

    this.addNewLect = true;
    this.resetValues();
  }

  //Reset values of record details
  resetValues(){

    this.desc = "";
    this.lectureId = 0;
    this.teacherId = 0;
    this.studentId = 0;
  }

   //get TeacherID
   getId(id){

    this.lectureStudentId = id;
  }


  /* 
    Api End Points
  */

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

  //Get all Students
  onGetStudents(){

    this.student.getStudents().subscribe((data)=>{
      //add initial results to temp storage
      this.temp = data.result;

      //open desired object in this case array of items
      this.studentsDB = this.temp.items;
    })

    console.log(this.studentsDB)
  }


  //Get all Students in a Lecture
  onGetLectureStudent(){

    this.lectureStudent.getLectureStudent().subscribe((data)=>{
      //add initial results to temp storage
      this.temp = data.result;

      //open desired object in this case array of items
      this.lectureStudentDB = this.temp.items;
      
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
      this.addNew = false;
      
    });
      
  }

   //save new Student in a Lecture
   onAddLectureStudent(){
    let obj ={
      lectureId: this.lectureId,
      studentId: this.studentId
    }

    this.lectureStudent.addLectureStudent(obj).subscribe(result =>{

      this.onGetLectureStudent();
      this.addNewLect = false;
      this.selected = true;
    });
      
  }


  //remove Student from lecture
  onRemoveStudent(){

    let id = this.lectureStudentId;
    
    this.lectureStudent.deleteLectureStudent(id).subscribe(result =>{

      this.onGetLectureStudent();

    })
  }

}
