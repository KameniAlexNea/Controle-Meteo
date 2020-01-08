export class Location {

    private _id : string = '';
    private _country_name : string = ''; 
    private _city_name : string = ''; 
    private _longitude : number  = 0;
    private _latitude : number = 0;
    
    set id(id : string){
        this._id = id;
    }

    get id() : string {
        return this._id;
    }

    get country() : string {
        return this._country_name;
    }

    set country(country : string) {
        this._country_name = country;
    }

    get city() : string {
        return this._city_name;
    }

    set city(city : string) {
        this._city_name = city;
    }

    get longitude() :  number {
        return this._longitude;
    }

    set longitude(longitude : number) {
        this._longitude = longitude;
    }

    get latitude() : number {
        return this._latitude;
    }

    set latitude(latitude : number) {
        this._latitude = latitude;
    }
}





