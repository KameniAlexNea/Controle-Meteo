import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils/public_api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navs: Array<String>
	name:String

	constructor() {
		this.name = "Controle Meteo"
		this.navs = new Array<String>("accueil", "about", "contact")
		// Gerer la connexion du user ici
	}

  ngOnInit() {
  }

}
