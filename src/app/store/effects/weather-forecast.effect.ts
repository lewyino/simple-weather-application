import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DarkskyService} from '../../services/darksky.service';
import {
    LoadWeatherForecastFailedAction,
    LoadWeatherForecastSuccessAction,
    WeatherForecastActionEnum
} from '../actions/weather-forecast.action';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {DarkskyInterface} from '../../models/interfaces/darksky.interface';


@Injectable()
export class WeatherForecastEffects {

    @Effect()
    loadWeatherForecast$ = this.actions$
        .pipe(
            ofType(WeatherForecastActionEnum.LOAD),
            switchMap((location: LocationModel) => this.darkskyService.getDataForLatLng(location.lat, location.lng)
                .pipe(
                    map((darkskyData: DarkskyInterface) => {
                        const weatherForecast = new WeatherForecastModel({
                            location,
                            ...darkskyData.currently
                        });
                        return new LoadWeatherForecastSuccessAction(weatherForecast);
                    }),
                    catchError(() => of(new LoadWeatherForecastFailedAction()))
                ))
        );

    constructor(
        private actions$: Actions,
        private darkskyService: DarkskyService
    ) {}
}
