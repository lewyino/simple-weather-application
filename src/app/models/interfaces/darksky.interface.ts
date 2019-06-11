import {DarkskyDataPointInterface} from './darksky-data-point.interface';

export interface DarkskyInterface {
    latitude: number;
    longitude: number;
    timezone: string;
    currently: DarkskyDataPointInterface;
}
