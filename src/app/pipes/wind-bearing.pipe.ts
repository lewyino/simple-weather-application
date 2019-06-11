import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'windBearing'
})
export class WindBearingPipe implements PipeTransform {

    transform(value: number, args?: any): string {
        if (!value && value !== 0) {
            return '';
        }
        const tmp = ['N', 'N-E', 'E', 'S-E', 'S', 'S-W', 'W', 'N-W'];
        for (let i = 0; i < 8; i++) {
            const range1 = 45 * i - 22.5;
            const range2 = 45 * i + 22.5;
            if (value > range1 && value < range2) {
                return tmp[i];
            }
        }

    }

}
