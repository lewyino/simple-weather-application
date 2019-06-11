import {Component, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {filter, take} from 'rxjs/operators';
import {StoreService} from '../../services/store.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-weather-main',
    templateUrl: './weather-main.component.html',
    styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit {

    locationList$: Observable<LocationModel[]>;
    selectedLocationWeatherForecast$: Observable<WeatherForecastModel>;

    constructor(private storeService: StoreService) {
    }

    ngOnInit() {
        this.locationList$ = this.storeService.getLocationsList();
        this.selectedLocationWeatherForecast$ = this.storeService.getSelectedLocationWeatherForecast();
        this.locationList$
            .pipe(
                filter((data: LocationModel[]) => data && data.length > 0),
                take(1)
            )
            .subscribe((locations: LocationModel[]) => {
                if (locations && locations.length) {
                    this.storeService.setSelectedLocationWeatherForecast(locations[0]);
                }
            });
        this.storeService.loadLocationsList();
    }

}
