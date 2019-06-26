import {Injectable} from '@angular/core';
import {LoadLocationsFailedAction, LoadLocationsSuccessAction, LocationActionEnum} from '../actions/location.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadWeatherForecastAction} from '../actions/weather-forecast.action';
import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationModel} from '../../models/location.model';


@Injectable()
export class LocationEffects {

    @Effect()
    loadLocationsList$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.LOAD_LOCATIONS),
            tap(() => this.storeService.loadLocationsList()),
            switchMap(() => this.storeService.getLocationsList()
                .pipe(
                    map((locations) => new LoadLocationsSuccessAction(locations)),
                    catchError(() => of(new LoadLocationsFailedAction()))
                ))
        );

    @Effect()
    selectLocation$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.SELECT_LOCATION),
            map((action: NgrxActionModel<LocationModel>) => new LoadWeatherForecastAction(action.payload))
        );

    constructor(
        private actions$: Actions,
        private storeService: StoreService
    ) {}
}
