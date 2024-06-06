function validateEmptyFields(campo) {
    return campo === '' || campo === undefined || campo === ' ' || campo === null;
}

function urlStartsWithHTTPS(url) {
    // validates if the url is a string
    if (typeof url !== 'string') {
        return false;
    }
    // validates if the url starts with "https://"
    return url.startsWith('https://');
}

function priceIsNumeric(price) {
    // converts the price into a numerical value
    const number = parseFloat(price);

    // valid if the conversion was successful and if the number positive and greater than 0
    if (isNaN(number) || number <= 0) {
        return false;
    } else {
        return true;
    }
}

export const validations = {
    validateEmptyFields,
    urlStartsWithHTTPS,
    priceIsNumeric
}