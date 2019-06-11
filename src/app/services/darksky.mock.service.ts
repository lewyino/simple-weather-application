import {Observable, of} from 'rxjs';
import {DarkskyInterface} from '../models/interfaces/darksky.interface';

export class DarkskyMockService {

    getDataForLatLng(lat: number, lng: number): Observable<DarkskyInterface> {
        return of(
            {
                currently: {
                    summary: 'summary',
                    humidity: 0.5,
                    apparentTemperature: 10,
                    icon: 'icon',
                    temperature: 10,
                    time: 1,
                    windSpeed: 10,
                    windBearing: 20,
                },
                latitude: 1,
                longitude: 1,
                timezone: 'timezone'
            }
        );
    }
}
