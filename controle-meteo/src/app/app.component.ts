import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent {
   title = 'controle-meteo';

   constructor() {
      setTheme('bs4'); // or 'bs3'
   }
}
