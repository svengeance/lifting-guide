import { AppStateService } from './../services/app-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get sliderText(): string { return this.appState.isUpperBodySelected.getValue() ? 'Upper Body' : 'Lower Body'; }

  constructor(private appState: AppStateService) { }

  ngOnInit() {
  }


  public exerciseTypeChange() {
    this.appState.isUpperBodySelected.next(!this.appState.isUpperBodySelected.getValue())
  }
}
