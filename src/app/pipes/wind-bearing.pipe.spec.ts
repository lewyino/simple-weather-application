import {WindBearingPipe} from './wind-bearing.pipe';

describe('WindBearingPipe', () => {
    it('create an instance', () => {
        const pipe = new WindBearingPipe();
        expect(pipe).toBeTruthy();
    });

    const tab = [
        {bearing: 20, result: 'N'},
        {bearing: 22, result: 'N'},
        {bearing: 23, result: 'N-E'},
        {bearing: 45, result: 'N-E'},
        {bearing: 90, result: 'E'},
        {bearing: 110, result: 'E'},
        {bearing: 113, result: 'S-E'},
        {bearing: 180, result: 'S'},
        {bearing: 200, result: 'S'},
        {bearing: 220, result: 'S-W'},
        {bearing: 270, result: 'W'},
        {bearing: 290, result: 'W'},
        {bearing: 320, result: 'N-W'},
    ];
    for (const i of tab) {
        it(`WindBearingPipe should return ${i.result} for ${i.bearing}`, () => {
            const pipe = new WindBearingPipe();
            expect(pipe.transform(i.bearing)).toBe(i.result);
        });
    }
});
