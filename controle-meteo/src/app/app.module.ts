import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MeteoActuelleComponent } from './meteo-actuelle/meteo-actuelle.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'User',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: true } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'surname', keypath: 'surname', options: { unique: false } },
      { name: 'picture', keypath: 'picture', options: { unique: false } },
      { name: 'sex', keypath: 'sex', options: { unique: false } },
      { name: 'birthday', keypath: 'birthday', options: { unique: false } }
    ]
  },
  {
    store: 'Location',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'country_name', keypath: 'country_name', options: { unique: false } },
      { name: 'city_name', keypath: 'city_name', options: { unique: false } },
      { name: 'longitude', keypath: 'longitude', options: { unique: false } },
      { name: 'latitude', keypath: 'latitude', options: { unique: false } }
    ]
  }
]
};

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      MeteoActuelleComponent,
   ],
   imports: [
      BsDropdownModule.forRoot(),
      BrowserModule,
      AppRoutingModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      AccordionModule.forRoot(),
      AlertModule.forRoot(),
      ButtonsModule.forRoot(),
      CarouselModule.forRoot(),
      CollapseModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      PopoverModule.forRoot(),
      ProgressbarModule.forRoot(),
      RatingModule.forRoot(),
      SortableModule.forRoot(),
      TabsModule.forRoot(),
      TimepickerModule.forRoot(),
      TypeaheadModule.forRoot(),
      FontAwesomeModule,
      NgxIndexedDBModule.forRoot(dbConfig)
   ],
   providers: [],
   bootstrap: [AppComponent],
   exports: [BsDropdownModule, TooltipModule, ModalModule, CollapseModule, TabsModule, ButtonsModule, TypeaheadModule]
})
export class AppModule { }
