import {
  Component,
  EventEmitter,
  NgZone,
  Output,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { City, State } from 'src/app/Interface/Data.interface';
import { student } from 'src/app/Interface/Student.interface';
import { LoginService } from 'src/app/services/login.service';

interface emitter {
  value: student;
  isEdit: boolean;
  index: number;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  reactiveForm: FormGroup;
  states: State[];
  cities: City[];
  updateIndex: number = -1;
  isEdit: boolean = false;
  @Input() set student(value: number) {
    if (value != -1) {
      this.createForm();
      this.isEdit = true;
      this.updateIndex = value;
    }
  }
  @Output() submit: EventEmitter<emitter> = new EventEmitter();
  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.getStates();
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.formBuilder.group({
      fullName: this.formBuilder.group({
        firstName: ['Abhishek', Validators.required],
        middleName: ['Nath'],
        lastName: ['Upadhyay', Validators.required],
      }),
      email: ['Abhishek@gmail.com', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        building: ['Naval Tower'],
        area: ['Malviya Nagar'],
        state: [''],
        city: [''],
      }),
      gender: ['male', Validators.required],
      skills: this.formBuilder.array(['kickBoxing']),
      educationDetails: this.formBuilder.group({
        '10th': this.formBuilder.group({
          marks: ['99'],
          grade: ['A+'],
          yearOfPassing: ['2017'],
        }),
        '12th': this.formBuilder.group({
          marks: ['89'],
          grade: ['A'],
          yearOfPassing: ['2019'],
        }),
        degree: this.formBuilder.group({
          marks: ['79'],
          grade: ['B+'],
          yearOfPassing: ['2015'],
        }),
      }),
    });
    if (this.isEdit) {
      const data: student = this.service.studentList[this.updateIndex];
      this.reactiveForm?.setValue(data);
      this.loadCities(Number(data.address.state));
    }
  }

  createSkillField(): FormControl {
    return this.formBuilder.control('');
  }

  onStateChange(stateId: any) {
    this.loadCities(stateId.value);
  }

  loadCities(stateId: number) {
    this.service.findCityByID(stateId).subscribe((cities: any) => {
      this.cities = cities;
      this.cdr.detectChanges();
    });
  }

  get firstName() {
    return this.reactiveForm.get('fullName.firstName') as FormControl;
  }
  get lastName() {
    return this.reactiveForm.get('fullName.lastName') as FormControl;
  }
  get middleName() {
    return this.reactiveForm.get('fullName.middleName') as FormControl;
  }
  get email() {
    return this.reactiveForm.get('email') as FormControl;
  }
  get gender() {
    return this.reactiveForm.get('gender') as FormControl;
  }
  get city() {
    return this.reactiveForm.get('address.city') as FormControl;
  }
  get state() {
    return this.reactiveForm.get('address.state') as FormControl;
  }
  get area() {
    return this.reactiveForm.get('address.area') as FormControl;
  }
  get building() {
    return this.reactiveForm.get('address.building') as FormControl;
  }

  get TenthMarks() {
    return this.reactiveForm.get('educationDetails.10th.marks') as FormControl;
  }
  get TenthGrade() {
    return this.reactiveForm.get('educationDetails.10th.grade') as FormControl;
  }
  get TenthYear() {
    return this.reactiveForm.get(
      'educationDetails.10th.yearOfPassing'
    ) as FormControl;
  }

  get TwelfthMarks() {
    return this.reactiveForm.get('educationDetails.12th.marks') as FormControl;
  }
  get TwelfthGrade() {
    return this.reactiveForm.get('educationDetails.12th.grade') as FormControl;
  }
  get TwelfthYear() {
    return this.reactiveForm.get(
      'educationDetails.12th.yearOfPassing'
    ) as FormControl;
  }

  get DegreeMarks() {
    return this.reactiveForm.get(
      'educationDetails.degree.marks'
    ) as FormControl;
  }
  get DegreeGrade() {
    return this.reactiveForm.get(
      'educationDetails.degree.grade'
    ) as FormControl;
  }
  get DegreeYear() {
    return this.reactiveForm.get(
      'educationDetails.degree.yearOfPassing'
    ) as FormControl;
  }

  get skillsFormArray(): FormArray {
    return this.reactiveForm.get('skills') as FormArray;
  }

  addSkillField() {
    this.skillsFormArray.push(this.createSkillField());
  }

  removeSkillField(index: number) {
    this.skillsFormArray.removeAt(index);
  }

  getStates() {
    this.service.findStates().subscribe((state) => {
      this.states = state;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    this.submit.emit({
      value: this.reactiveForm.value,
      isEdit: this.isEdit,
      index: this.updateIndex,
    });

    this.reactiveForm.reset();
  }
}
