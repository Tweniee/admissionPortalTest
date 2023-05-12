import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoginService } from './services/login.service';
import { emitter, student } from './Interface/Student.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'admissionPortal';
  singleStudent: number = -1;
  addStudents: boolean = false;
  isLoggedIn: boolean = this.loginService.isLoggedIn;
  studentList: student[] = [];
  constructor(public loginService: LoginService,private toastr: ToastrService) {}

  ngOnInit(): void {}

  loggedIn() {
    this.isLoggedIn = this.loginService.isLoggedIn;
  }
  addStudent() {
    this.addStudents = true;
  }
  getStudent(student: emitter) {
    this.addStudents = false;
    if (student.isEdit) {
      this.toastr.success('Record Updated Successfully', 'Success');
      this.studentList[student.index] = student.value;
    } else {
      this.toastr.success('Record Created Successfully', 'Success');
      this.studentList.push(student.value);
    }
    this.loginService.studentList = this.studentList;
  }
  isLogout() {
    this.isLoggedIn = false;
    this.addStudents = false;
    localStorage.clear();
  }
  editStudent(event: number) {
    this.isLoggedIn = true;
    this.addStudents = true;
    console.log(this.loginService.studentList);
    this.singleStudent = event;
  }
  deleteRecord(event: number) {
    
    this.loginService.studentList.splice(event, 1);
  }
}
