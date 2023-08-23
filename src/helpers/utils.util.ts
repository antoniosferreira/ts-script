export function substringFromDelimeters(value: string, delimeter: string) {
    const pFrom = value.indexOf(delimeter) + 1;
    const pTo = value.lastIndexOf(delimeter);

    return value.substring(pFrom, pTo);
};

