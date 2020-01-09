import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../model/weather/weather';

@Component({
	selector: 'app-display-weather',
	templateUrl: './display-weather.component.html',
	styleUrls: ['./display-weather.component.scss']
})
export class DisplayWeatherComponent implements OnInit {

	constructor() { }

	@Input()
	private weather: Weather;

	@Input()
	private typeW: string

	imgBg: string

	ngOnInit() {
		this.setImageByTemp()
	}

	setImageByTemp() {
		if (this.weather.temperature >= 30) {
			this.imgBg = "icon-2.svg"
		} else if (this.weather.temperature >= 25) {
			this.imgBg = "icon-3.svg"
		} else if (this.weather.temperature >= 20) {
			this.imgBg = "icon-5.svg"
		} else if (this.weather.temperature >= 20) {
			this.imgBg = "icon-6.svg"
		} else if (this.weather.temperature >= 15) {
			this.imgBg = "icon-8.svg"
		} else if (this.weather.temperature >= 10) {
			this.imgBg = "icon-10.svg"
		} else {
			this.imgBg = "icon-11.svg"
		}

	}

}
