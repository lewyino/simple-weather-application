import {ActionReducerMap} from '@ngrx/store';
import {reducer as locationReducer} from './location.reducer';
import {reducer as weatherForecastReducer} from './weather-forecast.reducer';
import {ApplicationStateInterface} from '../model/application-state.interface';

export const reducers: ActionReducerMap<ApplicationStateInterface> = {
    location: locationReducer,
    weatherForecast: weatherForecastReducer,
};
