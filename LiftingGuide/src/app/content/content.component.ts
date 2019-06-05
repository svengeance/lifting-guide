import { AppStateService } from './../services/app-state.service';
import { Exercise } from './../models/exercise';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, switchMap, tap, skip } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from '../services/data.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { BodyHalf } from '../models/enums/body-half.enum';
import { MatGridList } from '@angular/material';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  exercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);

  breakpoint: string = Breakpoints.Handset;
  @ViewChild('grid', null) matGridList: MatGridList;

  get numColumns(): number {
    return this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 3;
  }

  get columnHeight(): number {
    return this.breakpointObserver.isMatched(Breakpoints.Handset) ? 450 : 350;
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private dataService: DataService,
              private appState: AppStateService
              // private lightbox: Lightbox
              ) { }

  ngOnInit(): void {    
    this.dataService.getExercises(this.appState.isUpperBodySelected.getValue()).subscribe(res => this.exercises$.next(res));
    this.exercises$.subscribe(console.log);
    this.appState.isUpperBodySelected.pipe(
      skip(1),
      switchMap(v => this.dataService.getExercises(v)),
      tap(e => this.exercises$.next(e))
    ).subscribe();  
  }

  openImage(src: string) {
    window.open(src, '_blank');
    // let album = [{ src }] as IAlbum[];
    //this.lightbox.open(album)
  }
}
