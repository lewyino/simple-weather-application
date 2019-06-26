import {ApplicationStateInterface} from '../model/application-state.interface';
import {createSelector} from '@ngrx/store';
import {WeatherForecastModel} from '../../models/weather-forecast.model';

const weatherForecastState = (state: ApplicationStateInterface): WeatherForecastModel => state.weatherForecast;

export const getWeatherForecast = createSelector(
    weatherForecastState,
    (state: WeatherForecastModel) => state
);
