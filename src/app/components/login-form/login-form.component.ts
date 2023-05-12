import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

interface response {
  valid: boolean;
  role: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  @Output() loggedIn: EventEmitter<void> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('Jay', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('Jay', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loginService
        .verifyUser(username, password)
        .subscribe((item: response) => {
          if (item) {
            const { valid, role } = item;
            localStorage.setItem('role', role);
            this.loginForm.reset();
            this.toastr.success('Welcome to the Tweniee', 'Success');
            this.loggedIn.emit();
          } else {
            this.toastr.error(
              'Please check username and password',
              'Invalid Credentials.'
            );
          }
        });
    } else {
      this.toastr.error('Invalid Form', 'Form Error');
    }
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
