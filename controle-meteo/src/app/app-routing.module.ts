import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeteoActuelleComponent } from './meteo-actuelle/meteo-actuelle.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';


const routes: Routes = [
   { path: '', redirectTo: '/controle-meteo', pathMatch: 'full' },
   { path: 'controle-meteo/signIn', component: LoginComponent },
   { path: 'controle-meteo/signUp', component: RegisterComponent },
   { path: 'controle-meteo', component: MeteoActuelleComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {

}

export const routingComponents = [LoginComponent, RegisterComponent, MeteoActuelleComponent]
