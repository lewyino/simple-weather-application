import {Component, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {filter, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationStateInterface} from '../../store/model/application-state.interface';
import {getLocationsList} from '../../store/selectors/location.selector';
import {getWeatherForecast} from '../../store/selectors/weather-forecast.selector';
import {LoadLocationsAction, SelectLocationsAction} from '../../store/actions/location.action';

@Component({
    selector: 'app-weather-main',
    templateUrl: './weather-main.component.html',
    styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit {

    locationList$: Observable<LocationModel[]>;
    weatherForecast$: Observable<WeatherForecastModel>;

    constructor(private store: Store<ApplicationStateInterface>) {
    }

    ngOnInit() {
        this.locationList$ = this.store.pipe(
            select(getLocationsList)
        );
        this.weatherForecast$ = this.store.pipe(
            select(getWeatherForecast)
        );
        this.locationList$
            .pipe(
                filter((data: LocationModel[]) => data && data.length > 0),
                take(1)
            )
            .subscribe((locations: LocationModel[]) => {
                this.store.dispatch(new SelectLocationsAction(locations[0]));
            });
        this.store.dispatch(new LoadLocationsAction());
    }

}
