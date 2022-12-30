export const accumulateVolume = (array, isCurrentValue: boolean = true) => {
    const total: number[] = [];
    array
        .map((item) => {
            return item[1];
        })
        .reduce((accumulator, currentValue, currentIndex) => {
            total[currentIndex] = Number(accumulator) + Number(currentValue);

            return isCurrentValue ? Number(accumulator) + Number(currentValue) : Number(accumulator);
        }, 0);

    return total;
};
