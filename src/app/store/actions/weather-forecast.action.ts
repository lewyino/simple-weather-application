import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationModel} from '../../models/location.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';

export enum WeatherForecastActionEnum {
    LOAD = '[WeatherForecastAction] LOAD',
    LOAD_SUCCESS = '[WeatherForecastAction] LOAD_SUCCESS',
    LOAD_FAILED = '[WeatherForecastAction] LOAD_FAILED',
}

export class LoadWeatherForecastAction extends NgrxActionModel<LocationModel> {
    readonly type = WeatherForecastActionEnum.LOAD;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class LoadWeatherForecastSuccessAction extends NgrxActionModel<WeatherForecastModel> {
    readonly type = WeatherForecastActionEnum.LOAD_SUCCESS;

    constructor(weatherForecast: WeatherForecastModel) {
        super();
        this.payload = weatherForecast;
    }
}

export class LoadWeatherForecastFailedAction extends NgrxActionModel {
    readonly type = WeatherForecastActionEnum.LOAD_FAILED;
}

