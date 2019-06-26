import {NgrxActionModel} from '../model/ngrx-action.model';
import {WeatherForecastModel} from '../../models/weather-forecast.model';
import {WeatherForecastActionEnum} from '../actions/weather-forecast.action';

const initialState = null;

export function reducer(state: WeatherForecastModel = initialState, action: NgrxActionModel<any>): WeatherForecastModel {
    switch (action.type) {
        case WeatherForecastActionEnum.LOAD_SUCCESS:
            return action.payload;
        default: {
            return  state;
        }
    }
}
