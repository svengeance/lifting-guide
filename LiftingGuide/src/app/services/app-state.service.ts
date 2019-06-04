import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public isUpperBodySelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }
}
