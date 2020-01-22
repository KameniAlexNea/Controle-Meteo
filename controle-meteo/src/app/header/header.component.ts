import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils/public_api';
import { TokenService } from '../service/authentificate/token.service';
import { User } from '../model/user';
import { DatabaseUserService } from '../service/database/database-user.service';
import { AuthenticationService } from '../service/authentificate/authentication.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   navs: Array<String> = new Array();
   name: String = "";
   user: User = new User("", "","", "", "", "", "");

   constructor(private authS: AuthenticationService, private userService: DatabaseUserService, router: Router) {
      this.name = "Controle Meteo"
      this.navs = new Array<String>("accueil", "about", "contact")
      console.log(this.authS.isAuthenticate)
      if (authS.isAuthenticate) {
         this.authS.user().then(user => {
            this.user = user;
            console.log(user)
         })
      } else {
         router.navigate(['controle-meteo/signIn']);
      }
      // Gerer la connexion du user ici
   }



   ngOnInit() {
   }

}
