// Conexion a la API para hacer las peticiones GET,POST,DELETE

// url de la API
const API_URL = 'http://localhost:3000/productos';

// peticion GET para obtener los productos
async function obtenerProductos() {
    const productos = await fetch(API_URL);

    const productosConvertidos = productos.json();

    return productosConvertidos;
}

export const conexionAPI = {
    obtenerProductos,
}