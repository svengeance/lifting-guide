import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Exercise } from '../models/exercise';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BodyHalf } from '../models/enums/body-half.enum';
import { filter } from 'minimatch';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly exercisesUrl: string = environment.baseUrl + '/assets/data.json?ver=' + Math.random() * 10000000;

  private _exercises: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);

  constructor(private api: ApiService) { }

  public getExercises(isUpperBody: boolean): Observable<Exercise[]> {    
    if (this._exercises.getValue().length) 
      return of(this._exercises.value.filter(f => f.bodyHalf == (isUpperBody ? 'Upper' : 'Lower')));

    this.api.get<Exercise[]>(this.exercisesUrl).pipe(
      tap(t => t.forEach(f => f.imageUrl = `${environment.baseUrl}${f.imageUrl}`)),
      map(m => this._exercises.next(m))
    ).subscribe();

    this._exercises.subscribe(val => console.log(val));

    return this._exercises.asObservable().pipe(
      map(m => m.filter(f => f.bodyHalf == (isUpperBody ? 'Upper' : 'Lower'))),
    );
  }
}
