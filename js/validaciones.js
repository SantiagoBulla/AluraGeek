
function validarCamposVacios(campo) {
    return campo === '' || campo === undefined || campo === ' ' || campo === null;
}

function urlStartsWithHTTPS(url) {
    // Valida si la URL es un str
    if (typeof url !== 'string') {
        return false;
    }
    // valida si la url empieza con "https://"
    return url.startsWith('https://');
}

function precioNumerico(precio) {
    // convierte el precio en valor numerico
    const numero = parseFloat(precio);

    // valida si la conversion fue exitosa y si el numero positivo y mayor que 0
    if (isNaN(numero) || numero <= 0) {
        return false;
    } else {
        return true;
    }
}

export const validaciones = {
    validarCamposVacios,
    urlStartsWithHTTPS,
    precioNumerico
}