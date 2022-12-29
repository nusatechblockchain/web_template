export const numberFormat = (initalValue: number = 0, currency: string = 'USA'): string | number => {
    const thousand = new Intl.NumberFormat(currency);
    return thousand.format(initalValue);
};
