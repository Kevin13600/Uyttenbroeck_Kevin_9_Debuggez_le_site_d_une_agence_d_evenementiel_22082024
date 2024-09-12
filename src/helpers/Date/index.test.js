import { getMonth } from './index';

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function returns janvier for 2022-01-01 as date", () => {
            const date = new Date('2022-01-01');
            const result = getMonth(date);
            expect(result).toBe('janvier');
        });

        it("the function returns juillet for 2022-07-08 as date", () => {
            const date = new Date('2022-07-08');
            const result = getMonth(date);
            expect(result).toBe('juillet');
        });


        it("the function returns décembre for 2022-12-31 as date", () => {
            const date = new Date('2022-12-31');
            const result = getMonth(date);
            expect(result).toBe('décembre');
        });

        it("the function returns avril for 2023-04-15 as date", () => {
            const date = new Date('2023-04-15');
            const result = getMonth(date);
            expect(result).toBe('avril');
        });
    });
});

