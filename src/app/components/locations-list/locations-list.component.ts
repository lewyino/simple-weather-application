import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';

@Component({
    selector: 'app-locations-list',
    templateUrl: './locations-list.component.html',
    styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
    @Input() locationsList: LocationModel[];
    @Input() selectedLocationWeatherForecast: WeatherForecastModel;

    constructor() {
    }

    ngOnInit() {
    }

}
