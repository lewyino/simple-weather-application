import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {LocationStateInterface} from './location-state.interface';

export interface ApplicationStateInterface {
    location: LocationStateInterface;
    weatherForecast: WeatherForecastModel;
}
