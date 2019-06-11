import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecastModel} from '../../models/weather-forecast.model';

@Component({
    selector: 'app-location-weather',
    templateUrl: './location-weather.component.html',
    styleUrls: ['./location-weather.component.scss']
})
export class LocationWeatherComponent implements OnInit {

    @Input() weatherForecast: WeatherForecastModel;

    constructor() {
    }

    ngOnInit() {
    }
}
