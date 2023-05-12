import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit {
  _isLoggedIn: boolean = false;
  @Input() set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
  @Output() isLogout: EventEmitter<void> = new EventEmitter();
  constructor(public loginService: LoginService) {}
  ngOnInit(): void {}
  logout() {
    this.isLogout.emit();
  }
}
