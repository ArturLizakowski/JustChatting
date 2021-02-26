import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nb-layout [center]="true">
    <nb-layout-column [start]="true" ><router-outlet></router-outlet></nb-layout-column>
    
  </nb-layout>`
})
export class AppComponent {}
