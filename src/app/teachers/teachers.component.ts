import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from '../teacher-service.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  //View control
  section=1;

  //open record editor
  edit = false;

  //local storage of Teachers 
  teachersDB;
  temp;

  //teacher data
  teacherId : number = 0;
  fname: string= "";
  lname: string = "";
  email: string = "";
  phone: string = "";
  dob: string = "";

  

  constructor(private teacherService: TeacherServiceService) {   }

  ngOnInit() {

    this.onGetTeachers();
  }


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

    this.teacherId = id;
  }

  //Reset values of record details
  resetValues(){

    this.fname = "";
    this.lname = "";
    this.email = "";
    this.phone = "";
    this.dob = "";
    this.teacherId = 0;
  }

  

  //Get all Teachers
  onGetTeachers(){

    this.teacherService.getTeachers().subscribe((data)=>{
      //add initial results to temp storage
      this.temp = data.result;

      //open desired object in this case array of items
      this.teachersDB = this.temp.items;
      
    })
  }


  //Save new Teacher
  onSaveTeacher(){
    
    let obj = {

      firstName: this.fname,
      lastName: this.lname,
      telephoneNumber: this.phone,
      emailAddress: this.email,
      dob: this.dob
    };

    this.teacherService.newTeachers(obj).subscribe(result =>{

      //after adding return to list
      this.onGetTeachers();
      this.section = 1;
    });
  }

  //Select Teacher to update
  onSelectUpdate(item){

    this.openEditor();

    this.fname = item.firstName;
    this.lname = item.lastName;
    this.email = item.emailAddress;
    this.phone = item.telephoneNumber;
    this.dob = item.dob;
    this.teacherId = item.id;
  }

  //Update Teacher details
  onUpdateTeacher(){

    let obj = {

      firstName: this.fname,
      lastName: this.lname,
      emailAddress: this.email,
      telephoneNumber: this.phone,
      id: this.teacherId
    };

    this.teacherService.updateTeacher(obj).subscribe(result =>{
      this.onGetTeachers();
      this.edit = false;
    })

  }


  //Delete Teacher
  onDeleteTeacher(){

    let item = this.teacherId;

    this.teacherService.deleteTeacher(item).subscribe( results =>{
      this.onGetTeachers();
  
    });
  }

}
