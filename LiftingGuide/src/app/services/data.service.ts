import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BodyHalf } from '../models/enums/body-half.enum';
import { filter } from 'minimatch';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly exercisesUrl: string = environment.baseUrl + '/assets/data.json?ver=' + Math.random() * 10000000;

  private _exercises: Exercise[];

  constructor(private api: ApiService) { }

  public getExercises(isUpperBody: boolean): Observable<Exercise[]> {
    if (this._exercises) 
      return of(this._exercises.filter(f => f.bodyHalf == (isUpperBody ? 'Upper' : 'Lower')));

    let obs = this.api.get<Exercise[]>(this.exercisesUrl).pipe(
      tap(t => t.forEach(f => f.imageUrl = `${environment.baseUrl}${f.imageUrl}`))
    );

    obs.subscribe(res => this._exercises = res);

    return obs.pipe(
      map(m => m.filter(f => f.bodyHalf == (isUpperBody ? 'Upper' : 'Lower')))
    );
  }
}
