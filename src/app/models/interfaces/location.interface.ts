import {LatLngInterface} from './lat-lng.interface';

export interface LocationInterface extends LatLngInterface {
    name: string;
    id: string;
}
