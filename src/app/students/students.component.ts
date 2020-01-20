import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //View control
  section=1;

  //open record editor
  edit = false;

  //local storage of Teachers 
  studentsDB;
  temp;

  //teacher data
  studentId : number = 0;
  fname: string= "";
  lname: string = "";
  email: string = "";
  phone: string = "";
  dob: string = "";

  constructor(private  student: StudentService) { }

  ngOnInit() {
    this.onGetStudents();
  }

  /*
    View Control Methods
  */

  //View Change
  changeView(sectionId){

    this.section = sectionId;
    this.edit = false;
    this.resetValues();
  }

  //Open Editor
  openEditor(){

    this.edit = true;
  }

  //get TeacherID
  getId(id){

    this.studentId = id;
  }

  //Reset values of record details
  resetValues(){

    this.fname = "";
    this.lname = "";
    this.email = "";
    this.phone = "";
    this.dob = "";
    this.studentId = 0;
  }


  /**
   * API endpoints
   */

  //Get all Student
  onGetStudents(){

    this.student.getStudents().subscribe((data)=>{
      //add initial results to temp storage
      this.temp = data.result;

      //open desired object in this case array of items
      this.studentsDB = this.temp.items;
      
    })
  }


  //Save new Student
  onSaveStudent(){


    let obj = {

      firstName: this.fname,
      lastName: this.lname,
      telephoneNumber: this.phone,
      emailAddress: this.email,
      dob: this.dob
    };

    this.student.addStudent(obj).subscribe(result =>{

      //after adding return to list
      this.onGetStudents();
      this.section = 1;
    });
  }

  //Select Student to update
  onSelectUpdate(item){

    this.openEditor();

    this.fname = item.firstName;
    this.lname = item.lastName;
    this.email = item.emailAddress;
    this.phone = item.telephoneNumber;
    this.dob = item.dob;
    this.studentId = item.id;
  }

  //Update Student details
  onUpdateStudent(){

    let obj = {

      firstName: this.fname,
      lastName: this.lname,
      emailAddress: this.email,
      telephoneNumber: this.phone,
      id: this.studentId
    };

    this.student.updateStudent(obj).subscribe(result =>{
      this.onGetStudents();
      this.edit = false;
    })

  }


  //Delete Student
  onDeleteStudent(){

    let item = this.studentId;

    this.student.deleteStudent(item).subscribe( results =>{
      this.onGetStudents();
  
    });
  }

}
