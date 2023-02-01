export const getMasked = (value) => {
    if (!value) {
        return '';
    }

    const mask = '__:__';
    const def = mask.replace(/\D/g, '');
    const numbers = value.replace(/\D/g, '');
    const result = def.length >= numbers.length ? def : numbers;

    let i = 0;
    return mask.replace(/./g, (ch) => {
        if (i === 0 && Number(result.charAt(i)) > 2) {
            return '';
        }

        if (i === 2 && Number(result.charAt(i)) > 5) {
            return '';
        }

        if (/[_\d]/.test(ch) && i < result.length) {
            return result.charAt(i++);
        }

        if (i >= result.length) {
            return '';
        }

        return ch;
    });
};
