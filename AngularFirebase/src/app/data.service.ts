import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userIdSource = new BehaviorSubject<string>("");
  userId = this.userIdSource.asObservable();

  constructor() { }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }
}
