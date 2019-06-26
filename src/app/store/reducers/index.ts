import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {reducer as locationReducer} from './location.reducer';
import {reducer as weatherForecastReducer} from './weather-forecast.reducer';
import {ApplicationStateInterface} from '../model/application-state.interface';

export const reducers: ActionReducerMap<ApplicationStateInterface> = {
    locationsList: locationReducer,
    weatherForecast: weatherForecastReducer,
};

export const metaReducers: MetaReducer<ApplicationStateInterface>[] = !environment.production ? [] : [];
