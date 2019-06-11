import {LocationInterface} from './location.interface';

export interface WeatherForecastInterface {
    location: LocationInterface;
    summary: string;
    temperature: number;
    apparentTemperature: number;
    windSpeed: number;
    windBearing: number;
    humidity: number;
}
