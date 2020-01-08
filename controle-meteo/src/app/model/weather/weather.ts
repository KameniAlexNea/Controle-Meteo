export class Weather {

    private _temperature : number  = 0; 
    private _coulds : number = 0; 
    private _humidity : number = 0; 
    private _jour : string = "";
    private _heure : string = "";

    set temperature(temperature : number) {
        this._temperature = temperature;
    }

    get temperature() : number {
        return this._temperature;
    }

    set clouds(clouds : number) {
        this._coulds = clouds;
    }

    get clouds() : number {
        return this._coulds;
    }

    set humidity(humidity : number) {
        this._humidity = humidity;
    }

    get humidity() : number {
        return this._humidity;
    }

    set jour(jour : string) {
        this._jour = jour
    }

    get jour() : string {
        return this._jour;
    }

    set heure(heure : string) {
        this._heure = heure
    }

    get heure() : string {
        return this._heure;
    }
}