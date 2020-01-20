import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { LecturesComponent } from './lectures/lectures.component';
import { TeacherServiceService } from './teacher-service.service';
import {LectureServiceService} from './lecture-service.service'
import {StudentService} from "./student.service";
import {LectureStudentService} from "./lecture-student.service"

const appRoutes: Routes = [

  {path: "home", component: HomeComponent},
  {path: "teachers", component: TeachersComponent},
  {path: "students", component: StudentsComponent},
  {path: "lectures", component: LecturesComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeachersComponent,
    StudentsComponent,
    LecturesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [TeacherServiceService,LectureServiceService,StudentService, LectureStudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
