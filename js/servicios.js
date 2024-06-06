import { conexionAPI } from "./conexionAPI.js";

function crearCardProducto(nombre, precio, imagenUrl) {
    const producto = document.createElement('div');
    producto.className = 'products__card';
    producto.innerHTML = `
        <img src="${imagenUrl}" alt="product" class="products__card__img" />
        <div class="card__container__info">
            <p>${nombre}</p>
            <div class="card__container__value">
                <p>$ ${precio}</p>
                <img src="./img/trashIcon.png" alt="trashIcon" />
            </div>
        </div>`;

    return producto;
}

async function listarProductos(elementoContenedor, elementoError) {
    try {
        const listaAPI = await conexionAPI.obtenerProductos();

        listaAPI.forEach(producto => {
            elementoContenedor.appendChild(crearCardProducto(producto.nombre, producto.precio, producto.imagen))
        });

    } catch (error) {
        elementoError.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexión :( </h2>`;
    }
}

async function crearProducto(data) {
    const conexion = await fetch('http://localhost:3000/productos', {
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

export const serviciosAPI = {
    listarProductos,
    crearProducto
}