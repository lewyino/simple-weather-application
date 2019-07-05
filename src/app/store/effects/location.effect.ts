import {Injectable} from '@angular/core';
import {
    AddLocationFailedAction,
    AddLocationSuccessAction,
    DeleteLocationsFailedAction,
    DeleteLocationsSuccessAction,
    EditLocationFailedAction,
    EditLocationSuccessAction,
    LoadLocationFailedAction,
    LoadLocationsFailedAction,
    LoadLocationsSuccessAction,
    LoadLocationSuccessAction,
    LocationActionEnum
} from '../actions/location.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {Actions, Effect, ofType} from '@ngrx/effects';


@Injectable()
export class LocationEffects {

    @Effect()
    loadLocationsList$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.LOAD_LOCATIONS),
            switchMap(() => this.storeService.getLocationsList()
                .pipe(
                    map((locations) => new LoadLocationsSuccessAction(locations)),
                    catchError(() => of(new LoadLocationsFailedAction()))
                ))
        );

    @Effect()
    loadLocation$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.LOAD_LOCATION),
            switchMap(({type, payload}) => this.storeService.getLocation(payload)
                .pipe(
                    map((location) => location ? new LoadLocationSuccessAction(location) : new LoadLocationFailedAction()),
                    catchError(() => of(new LoadLocationFailedAction()))
                ))
        );

    @Effect()
    deleteLocation$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.DELETE),
            switchMap(({type, payload}) => this.storeService.deleteLocation(payload)
                .pipe(
                    map((result) => result ? new DeleteLocationsSuccessAction(payload) : new DeleteLocationsFailedAction()),
                    catchError(() => of(new DeleteLocationsFailedAction()))
                ))
        );

    @Effect()
    addLocation$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.ADD),
            switchMap(({type, payload}) => this.storeService.addLocation(payload)
                .pipe(
                    map((result) => result ? new AddLocationSuccessAction(true) : new AddLocationFailedAction()),
                    catchError(() => of(new AddLocationFailedAction()))
                ))
        );

    @Effect()
    editLocation$ = this.actions$
        .pipe(
            ofType(LocationActionEnum.EDIT),
            switchMap(({type, payload}) => this.storeService.editLocation(payload)
                .pipe(
                    map((result) => result ? new EditLocationSuccessAction(true) : new EditLocationFailedAction()),
                    catchError(() => of(new EditLocationFailedAction()))
                ))
        );

    constructor(
        private actions$: Actions,
        private storeService: StoreService
    ) {}
}
