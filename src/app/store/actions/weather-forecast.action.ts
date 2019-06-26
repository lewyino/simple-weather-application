import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';

export enum WeatherForecastActionEnum {
    LOAD = '[WeatherForecastAction] LOAD',
    LOAD_SUCCESS = '[WeatherForecastAction] LOAD_SUCCESS',
    LOAD_FAILED = '[WeatherForecastAction] LOAD_FAILED',
}

export class LoadWeatherForecastAction extends NgrxActionModel<LocationModel> {
    type: WeatherForecastActionEnum.LOAD;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class LoadWeatherForecastSuccessAction extends NgrxActionModel<WeatherForecastModel> {
    type: WeatherForecastActionEnum.LOAD_SUCCESS;

    constructor(weatherForecast: WeatherForecastModel) {
        super();
        this.payload = weatherForecast;
    }
}

export class LoadLocationsFailedAction extends NgrxActionModel {
    type: WeatherForecastActionEnum.LOAD_FAILED;
}

