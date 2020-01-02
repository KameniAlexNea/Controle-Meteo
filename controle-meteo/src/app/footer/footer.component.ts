import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

//'./footer.component.scss', 

export class FooterComponent implements OnInit {

  location: String
  phone: String
  mail: String
  about: String

  constructor() {
    this.location = "Melen Institute of Technology. Yaounde, Cameroun"
    this.phone = "+237657008671"
    this.mail = "etudiant@polytechnique.cm"
    this.about = "Une equipe de 5 étudiants du MIT, ayant suivie un cours de prog-web"
  }

  ngOnInit() {
  }

}
