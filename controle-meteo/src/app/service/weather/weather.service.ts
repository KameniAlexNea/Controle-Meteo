import { Injectable } from '@angular/core';
import {Weather} from '../../model/weather/weather';
import {Location} from '../../model/location/location';
const convert:number = 273.15;

//ce service gère l'API de données météoroliques : OWM

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey : string = "5a0ec580cc17b68d52de66ee2ac21262";
  //"YOUR_API_KEY";
  private url : string = "https://api.openweathermap.org/data/2.5/";
  
  constructor() { }

  //méthodes du service

//recuperation des données Current Weather de l'API par les noms
public WeatherByName(city : string, country : string) : any {
  let query = `${this.url}weather?q=${city},${country}&appid=${this.apiKey}`;
  return new Promise((resolve, reject) => {
    fetch(query)
    .then(resp => resp.json())
    .then((data) => {
      resolve(data);
    })
    .catch(()=>{reject();})
  });
}

//recupération des données Current Weather de l'API avec les coordonnées géographiques

  public WeatherByLocation(lat : number, lon : number) : any {
    let query = `${this.url}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      fetch(query)
      .then(resp => resp.json())
      .then((data) => {
        resolve(data);
      })
      .catch(()=>{reject();})
    });
  }

  //obtenir city ett country donné par l'utilisateur étant sur la carte
  public obtenirLocation(location: Location){
    var lat = location.latitude;
    var lon = location.longitude;
    this.ForecastByLocation(lat,lon).then(
      (data) =>{
        console.log(data)
        this.remplirLocation(data, location)
        console.log(location.id+" "+location.city+" "+location.country)
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
  }

  
  //obtention des données météoroliques

  public getWeatherByName(city:string, country:string):Weather{
    var meteo = new Weather();
    this.WeatherByName(city,country).then(
      (data) =>{
        this.remplirWeather(data, meteo)
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return meteo;
    return meteo;
  }
  
  public getWeatherByLocation(location : Location):Weather{
    var meteo = new Weather();
    var lat = location.latitude;
    var lon = location.longitude;
    this.WeatherByLocation(lat,lon).then(
      (data) =>{
        this.remplirWeather(data, meteo)
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return meteo;
  }

  //recupération des données Forecast de l'API avec les noms
  public ForecastByName(city : string,country:string) : any {
    let query = `${this.url}forecast?q=${city},${country}&appid=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      fetch(query)
      .then(resp => resp.json())
      .then((data) => {
        resolve(data);
      })
      .catch(()=>{reject();})
    });
  }
  
   //recupération des données Forecast de l'API avec les coordonnées géographiques
  public ForecastByLocation(lat : number, lon : number) {
    let query = `${this.url}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return new Promise((resolve, reject) => {
      fetch(query)
      .then(resp => resp.json())
      .then((data) => {
        resolve(data);
      })
      .catch(()=>{reject();})
    });
  } 
  
  //les méthodes suivantes retournent des tableaux des prédicitions des données météo par jour et par heure
  public getForecastHourlyByName(city:string, country:string){
    var hourly = new Array();
    this.ForecastByName(city, country).then(
      (data) =>{ 
        this.remplirForecastHourly(data, hourly);
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return hourly;
  }
  
  public getForecastHourlyByLocation(location: Location){
    var hourly = new Array();
    var lat = location.latitude;
    var lon = location.longitude;
    this.ForecastByLocation(lat, lon).then(
      (data) =>{
        this.remplirForecastHourly(data, hourly);
          },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return hourly;
  }
  
  public getForecastDailyByName(city:string, country:string){
    var daily = new Array();
    this.ForecastByName(city, country).then(
      (data) =>{
        this.remplirForecastDaily(data, daily);
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return daily;
  }

  public getForecastDailyByLocation(location: Location){
    var daily = new Array();
    var lat = location.latitude;
    var lon = location.longitude;
    this.ForecastByLocation(lat, lon).then(
      (data) =>{
        this.remplirForecastDaily(data, daily);
      },
      (error)=>{
        console.error("Echec : ",error)
      }
    );
    return daily;
  }

  public remplirWeather(data, meteo:Weather){
    //les données sont de la forme : main.temp ; main.humidity ; clouds.all
    meteo.humidity = data.main.humidity;
    meteo.temperature =data.main.temp - convert;
    meteo.clouds = data.clouds.all;
  }

  public remplirForecastHourly(data, hourly){
    //les données sont de la forme : list[] list.main.temp list.main.humidity list.clouds.all  list.dt_txt 
    var liste = data.list;
    let element;
    let weather;
    var j =0;
    var jour = new Date().getDay()//le jour d'aujourd'hui

    for(let i=0;i<liste.length;i++){
      weather = liste[i]
      var madate = new Date(weather.dt_txt).getDay()//la date au moment de calcul par l'API
      if(jour==madate){
        element=new Weather()
        element.humidity = weather.main.humidity;
        element.temperature = parseFloat((weather.main.temp - convert).toFixed(2));
        element.clouds = weather.clouds.all;
        element.heure= this.extractHour(weather.dt_txt);
        hourly[j] = element;
        j++;
      }else{//on ne prend plus rien
        break;
      }
    }
  }

  public remplirForecastDaily(data, daily){
    //les données sont de la forme : list[] list.main.temp list.main.humidity list.clouds.all  list.dt_txt 
    var liste = data.list;
    let element=new Weather();
    let weather;//on remplit le premier element
    element.humidity = liste[0].main.humidity;
    element.temperature = parseFloat((liste[0].main.temp - convert).toFixed(2));
    element.clouds = liste[0].clouds.all;
    element.jour= this.extractDay(liste[0].dt_txt);
    daily[0] = element;

    var j =1;
    for(let i=1;i<liste.length;i++){
      weather = liste[i];
      var madate = this.extractDay(weather.dt_txt);
      
      if(madate!=element.jour){//si la date de l'élement courant est fifférente de la date de l'element precedent
        element=new Weather()
        element.humidity = weather.main.humidity;
        element.temperature = parseFloat((weather.main.temp - convert).toFixed(2));
        element.clouds = weather.clouds.all;
        element.jour= madate;
        daily[j] = element;
        j++;
        
      }
    };
  }

  public remplirLocation(data, location: Location){
     //les données sont de la forme : city.id city.name city.country
     var id = data.city.id;
     var name= data.city.name;
     var country = data.city.country;
     location.id =id;
     location.city = name;
     location.country = country;

  }
  public extractDay(madate:string): string{
    var dateString= new Date(madate).toString().split(" ")[0]
    var tab_jour = {
      "Mon":"Lundi",
      "Tue":"Mardi",
      "Wed":"Mercredi",
      "Thu":"Jeudi",
      "Fri":"Vendredi",
      "Sat":"Samedi",
      "Sun":"Dimanche"
    }
    var day = tab_jour[dateString]
    return day
  }

  public extractHour(madate:string): string{
    var day= madate.split(" ")[1].substr(0,5);
    return day;
  }

}
