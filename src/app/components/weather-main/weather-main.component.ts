import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {filter, take, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationStateInterface} from '../../store/model/application-state.interface';
import {getLocationsList, getSelectedLocation} from '../../store/selectors/location.selector';
import {getWeatherForecast} from '../../store/selectors/weather-forecast.selector';
import {LoadLocationsAction, SelectLocationsAction} from '../../store/actions/location.action';
import {LoadWeatherForecastAction} from '../../store/actions/weather-forecast.action';

@Component({
    selector: 'app-weather-main',
    templateUrl: './weather-main.component.html',
    styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit, OnDestroy {

    locationList$: Observable<LocationModel[]>;
    selectedLocation$: Observable<LocationModel>;
    weatherForecast$: Observable<WeatherForecastModel>;
    private subscribe = true;

    constructor(private store: Store<ApplicationStateInterface>) {
    }

    ngOnInit() {
        this.locationList$ = this.store.pipe(
            select(getLocationsList)
        );
        this.weatherForecast$ = this.store.pipe(
            select(getWeatherForecast)
        );
        this.selectedLocation$ = this.store.pipe(
            select(getSelectedLocation)
        );
        this.locationList$
            .pipe(
                filter((data: LocationModel[]) => data && data.length > 0),
                take(1)
            )
            .subscribe((locations: LocationModel[]) => {
                this.store.dispatch(new SelectLocationsAction(locations[0]));
            });
        this.selectedLocation$
            .pipe(
                takeWhile(() => this.subscribe)
            )
            .subscribe((selected: LocationModel) => {
                this.store.dispatch(new LoadWeatherForecastAction(selected));
            });
        this.store.dispatch(new LoadLocationsAction());
    }

    ngOnDestroy(): void {
        this.subscribe = false;
    }

}
