// Connection to the API to make GET,POST,DELETE requests.

// API's url
const API_URL = 'http://localhost:3000/productos';

// GET request to obtain the products
async function getProducts() {
    const productos = await fetch(API_URL);

    const productosConvertidos = productos.json();

    return productosConvertidos;
}

// POST request to create a product
async function createProduct(data) {
    const conexion = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'aplication/json' },
        body: JSON.stringify(data)
    });

    const conexionConvertida = conexion.json();

    if (!conexion.ok) {
        throw new Error('Ha ocurrido un error al enviar el video');
    }

    return conexionConvertida;
}

// DELETE request to remove a product from the json file
async function removeProductById(id) {
    const conexion = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    const conexionConvertida = conexion.json();

    if (!conexion.ok) {
        throw new Error('Ha ocurrido un error al eliminar el video');
    }

    return conexionConvertida;
}

export const conexionAPI = {
    getProducts,
    createProduct,
    removeProductById,
}