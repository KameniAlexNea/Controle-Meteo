import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent {
   title = 'controle-meteo';

   authService:AuthenticationService;
   tokenService:TokenService

   constructor(auth: AuthenticationService, tokenService: TokenService) {
      setTheme('bs4'); // or 'bs3'
      this.authService= auth;
      this.tokenService = tokenService;
      this.authService.isAuthenticate
   }
}
