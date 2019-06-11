import {WeatherForecastInterface} from './interfaces/weather-forecast.interface';
import {LocationModel} from './location.model';

export class WeatherForecastModel implements WeatherForecastInterface {
    humidity: number;
    location: LocationModel;
    summary: string;
    temperature: number;
    apparentTemperature: number;
    windBearing: number;
    windSpeed: number;

    constructor(opts?: Partial<WeatherForecastInterface>) {
        opts = opts || {};
        this.humidity = opts.humidity || 0;
        this.location = new LocationModel(opts.location);
        this.summary = opts.summary;
        this.temperature = opts.temperature;
        this.apparentTemperature = opts.apparentTemperature;
        this.windBearing = opts.windBearing;
        this.windSpeed = opts.windSpeed;
    }
}
