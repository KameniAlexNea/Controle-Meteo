import { Injectable } from '@angular/core';
import { Location } from 'src/app/model/location/location';
import { Weather } from 'src/app/model/weather/weather';
const convert: number = 273.15;

//ce service gère l'API de données météoroliques : OWM

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = "5a0ec580cc17b68d52de66ee2ac21262";
  //"YOUR_API_KEY";
  private url: string = "https://api.openweathermap.org/data/2.5/";

  constructor() { }

  //méthodes du service

  //recuperation des données Current Weather de l'API par les noms
  public WeatherByName(city: string, country: string): any {
    let query = `${this.url}weather?q=${city},${country}&appid=${this.apiKey}`;
    return new Promise<Weather>((resolve, reject) => {
      fetch(query)
        .then(resp => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch(() => { reject(); })
    });
  }

  //recupération des données Current Weather de l'API avec les coordonnées géographiques

  public WeatherByLocation(lat: number, lon: number): any {
    let query = `${this.url}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return new Promise<Weather>((resolve, reject) => {
      fetch(query)
        .then(resp => resp.json())
        .then((data) => {
          resolve(data);
          //console.log(data)
        })
        .catch(() => { reject(); })
    });
  }

  //obtenir city et country donné par l'utilisateur étant sur la carte
  public obtenirLocation(location: Location): any {
    //var loc = new Location();
    if (location.latitude != 0 && location.longitude != 0) {
      //console.log("je cherche"+location.id+" "+location.city+" "+location.country)
      var lat = location.latitude;
      var lon = location.longitude;
      return new Promise<Location>((resolve, reject) => {
        this.ForecastByLocation(lat, lon).then(
          (data) => {
            this.remplirByLocation(data, location);
            resolve(location);
            //console.log(location.id+" "+location.city+" "+location.country);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else if (location.city != "") {
      //console.log("je veux"+location.id+" "+location.latitude+" "+location.country+"et j'ai"+location.city)
      var city = location.city;
      return new Promise<Location>((resolve, reject) => {
        this.ForecastByName(city).then(
          (data) => {
            //console.log(data)
            this.remplirByName(data, location);
            resolve(location);
            //console.log("j'ai obtenu"+location.id+" "+location.latitude+" "+location.country)
          },
          (error) => {
            reject(error);
            alert("Wrong city name!");
          }
        );
      })
    }
  }


  //obtention des données météoroliques

  public getWeatherByName(city: string, country: string) {
    var meteo = new Weather();
    return new Promise<Weather>((resolve, reject) => {
      this.WeatherByName(city, country).then(
        (data) => {
          this.remplirWeather(data, meteo)
          resolve(meteo);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getWeatherByLocation(location: Location) {
    var meteo = new Weather();
    var lat = location.latitude;
    var lon = location.longitude;
    return new Promise<Weather>((resolve, reject) => {
      this.WeatherByLocation(lat, lon).then(
        (data) => {
          this.remplirWeather(data, meteo);
          resolve(meteo);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  //recupération des données Forecast de l'API avec les noms
  public ForecastByName(city: string): any {
    let query = `${this.url}forecast?q=${city}&appid=${this.apiKey}`;
    return new Promise<Weather>((resolve, reject) => {
      fetch(query)
        .then(resp => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch(() => { reject(); })
    });
  }

  //recupération des données Forecast de l'API avec les coordonnées géographiques
  public ForecastByLocation(lat: number, lon: number) {
    let query = `${this.url}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return new Promise<Weather>((resolve, reject) => {
      fetch(query)
        .then(resp => resp.json())
        .then((data) => {
          resolve(data);
          //console.log(data)
        })
        .catch(() => { reject(); })
    });
  }

  //les méthodes suivantes retournent des tableaux des prédicitions des données météo par jour et par heure
  public getForecastHourlyByName(city: string, country: string) {
    var hourly = new Array();
    return new Promise<Array<Weather>>((resolve, reject) => {
      this.ForecastByName(city).then(
        (data) => {
          this.remplirForecastHourly(data, hourly);
          resolve(hourly);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getForecastHourlyByLocation(location: Location) {
    var hourly = new Array();
    var lat = location.latitude;
    var lon = location.longitude;
    return new Promise<Array<Weather>>((resolve, reject) => {
      this.ForecastByLocation(lat, lon).then(
        (data) => {
          this.remplirForecastHourly(data, hourly);
          resolve(hourly);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getForecastDailyByName(city: string, country: string) {
    var daily = new Array();
    return new Promise<Array<Weather>>((resolve, reject) => {
      this.ForecastByName(city).then(
        (data) => {
          this.remplirForecastDaily(data, daily);
          resolve(daily);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getForecastDailyByLocation(location: Location) {
    var daily = new Array();
    var lat = location.latitude;
    var lon = location.longitude;
    return new Promise<Array<Weather>>((resolve, reject) => {
      this.ForecastByLocation(lat, lon).then(
        (data) => {
          this.remplirForecastDaily(data, daily);
          resolve(daily);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  public remplirWeather(data, meteo: Weather) {
    //les données sont de la forme : main.temp ; main.humidity ; clouds.all ; weather.description
    meteo.humidity = data.main.humidity;
    meteo.temperature = data.main.temp - convert;
    meteo.clouds = data.clouds.all;
    meteo.description = data.weather[0].description;
  }

  public remplirForecastHourly(data, hourly) {
    //les données sont de la forme : list[] list.main.temp list.main.humidity list.clouds.all  list.dt_txt list.weather.description
    var liste = data.list;
    let element;
    let weath;
    var j = 0;
    var jour = new Date().getDay()//le jour d'aujourd'hui

    for (let i = 0; i < liste.length; i++) {
      weath = liste[i]
      var madate = new Date(weath.dt_txt).getDay()//la date au moment de calcul par l'API
      if (jour == madate) {
        element = new Weather()
        element.humidity = weath.main.humidity;
        element.temperature = parseFloat((weath.main.temp - convert).toFixed(2));
        element.clouds = weath.clouds.all;
        element.description = weath.weather[0].description;
        element.heure = this.extractHour(weath.dt_txt);
        hourly[j] = element;
        j++;
      } else {//on ne prend plus rien
        break;
      }
    }
  }

  public remplirForecastDaily(data, daily) {
    //les données sont de la forme : list[] list.main.temp list.main.humidity list.clouds.all  list.dt_txt list.weather.description
    var liste = data.list;
    let element = new Weather();
    let weath;
    //on remplit le premier element
    element.humidity = liste[0].main.humidity;
    element.temperature = parseFloat((liste[0].main.temp - convert).toFixed(2));
    element.clouds = liste[0].clouds.all;
    element.description = liste[0].weather[0].description
    element.jour = this.extractDay(liste[0].dt_txt);
    daily[0] = element;

    var j = 1;
    for (let i = 1; i < liste.length; i++) {
      weath = liste[i];
      var madate = this.extractDay(weath.dt_txt);

      if (madate != element.jour) {//si la date de l'élement courant est fifférente de la date de l'element precedent
        element = new Weather()
        element.humidity = weath.main.humidity;
        element.temperature = parseFloat((weath.main.temp - convert).toFixed(2));
        element.clouds = weath.clouds.all;
        element.description = weath.weather[0].description;
        element.jour = madate;
        daily[j] = element;
        j++;

      }
    };
  }

  public remplirByLocation(data, location: Location) {
    //les données sont de la forme : city.id city.name city.country
    var id = data.city.id;
    var name = data.city.name;
    var country = data.city.country;
    location.id = id;
    location.city = name;
    location.country = country;
  }

  public remplirByName(data, location: Location) {
    //les données sont de la forme : city.id city.name city.country
    var id = data.city.id;
    var country = data.city.country;
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;

    location.id = id;
    location.country = country;
    location.latitude = lat;
    location.longitude = lon;
  }

  public extractDay(madate: string): string {
    var dateString = new Date(madate).toString().split(" ")[0]
    var tab_jour = {
      "Mon": "Lundi",
      "Tue": "Mardi",
      "Wed": "Mercredi",
      "Thu": "Jeudi",
      "Fri": "Vendredi",
      "Sat": "Samedi",
      "Sun": "Dimanche"
    }
    var day = tab_jour[dateString]
    return day;
  }

  public extractHour(madate: string): string {
    var day = madate.split(" ")[1].substr(0, 5);
    return day;
  }

}
