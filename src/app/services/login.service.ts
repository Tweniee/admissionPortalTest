import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { City, Data, State, User } from '../Interface/Data.interface';
import { student } from '../Interface/Student.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLoggedIn: boolean = false;
  studentList: student[] = [];
  constructor(private http: HttpClient) {}

  verifyUser(username: string, password: string) {
    const allData = this.http.get('../../assets/Data/Data.json').pipe(
      map((res: Data) => {
        const users: User[] = res.users;
        this.isLoggedIn = true;
        const user = users.filter(
          (user) => user.userName == username && user.password == password
        );
        if (user.length > 0) {
          return { valid: true, role: user[0].role };
        } else {
          return false;
        }
      })
    );
    return allData;
  }
  findStates() {
    const allStates = this.http.get('../../assets/Data/Data.json').pipe(
      map((res: Data) => {
        const states: State[] = res.States;
        return states;
      })
    );
    return allStates;
  }
  findCityByID(id: number): Observable<City[]> {
    return this.http
      .get<City[]>('../../assets/Data/Data.json')
      .pipe(
        map((data: any) =>
          data['Cities'].filter(
            (city: { StateID: number }) => city.StateID == id
          )
        )
      );
  }

  findStateName(id: number) {
    const state = this.http.get('../../assets/Data/Data.json').pipe(
      map((res: Data) => {
        const states: State[] = res.States;
        const state = states.filter((item) => {
          return item.StateID == id;
        });
        return state;
      })
    );
    return state
  }
}
