export const parseTime = function parseTime(string) {
    return Number(string) < 10 ? `0${string}` : string;
};
