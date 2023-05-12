import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { student } from 'src/app/Interface/Student.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  allStudent: student[] = [];
  @Output() addStudent: EventEmitter<void> = new EventEmitter();
  @Output() editStudent: EventEmitter<number> = new EventEmitter();
  @Output() deleteStudent: EventEmitter<number> = new EventEmitter();
  @Input() set studentList(value: student[]) {
    console.log(value);
    this.allStudent = value;
  }
  constructor(private service: LoginService, private cdr: ChangeDetectorRef) {}
  addStudentMethod() {
    this.addStudent.emit();
  }
  checkRole() {
    return localStorage.getItem('role') == 'admin';
  }
  showSkills(skills: string[]) {
    let skill = '';
    skills.forEach((item, index) => {
      if (skills.length == 1 || index == skills.length - 1) {
        skill = skill + item;
      } else {
        skill = skill + item + ',';
      }
    });
    return skill;
  }
  getState(stateId: any) {
    this.cdr.detectChanges();
    return this.service.findStateName(stateId);
  }
  editRecord(i: number) {
    console.log(this.service.studentList)
    this.editStudent.emit(i);
  }
  deleteRecord(i: number) {
    if(confirm("Are you Sure you want to deleted it?")){
    this.deleteStudent.emit(i);
    }
      
  }
}
