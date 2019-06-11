import {LocationInterface} from './interfaces/location.interface';
import * as uuid from 'uuid/v4';

export class LocationModel implements LocationInterface {
    lat: number;
    lng: number;
    name: string;
    id: string;

    constructor(opts?: Partial<LocationInterface>) {
        opts = opts || {};
        this.lat = opts.lat || 0;
        this.lng = opts.lng || 0;
        this.name = opts.name || '';
        this.id = opts.id || uuid();
    }
}
