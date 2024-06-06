import { conexionAPI } from "./conexionAPI.js";

function crearCardProducto(nombre, precio, imagenUrl, id) {
    const producto = document.createElement('div');
    producto.className = 'products__card';
    producto.dataset.id = id;
    producto.innerHTML = `
        <img src="${imagenUrl}" alt="product" class="products__card__img" />
        <div class="card__container__info">
            <p>${nombre}</p>
            <div class="card__container__value">
                <p>$ ${precio}</p>
                <img src="./img/trashIcon.png" alt="trashIcon" id="trashIcon" />
            </div>
        </div>`;

    return producto;
}

async function showProducts(elementoContenedor, elementoError) {
    try {
        // gets the products from db.json
        const listaAPI = await conexionAPI.getProducts();

        if (listaAPI.length === 0) {
            elementoError.style.display = 'block';
            return;
        }

        // create the HTML elements
        listaAPI.forEach(producto => {
            elementoContenedor.appendChild(crearCardProducto(producto.nombre, producto.precio, producto.imagen, producto.id))
        });

        // adds the functionality to delete products to every card
        borrarProducto();

    } catch (error) {
        elementoError.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexión :( </h2>`;
    }
}

async function insertProduct(data) {
    try {
        await conexionAPI.createProduct(data);
        alert("¡Producto ingresado con exito!")

    } catch (error) {
        alert(`¡Error al crear un elemento: ${error}!`)
    }
}

async function borrarProducto() {
    const cards = document.querySelectorAll('.products__card');

    // for each card the option to delete the product is enabled by clicking on the garbage icon 
    cards.forEach(card => {
        const trashIcon = card.querySelector('#trashIcon');
        trashIcon.addEventListener('click', async () => {
            try {
                await conexionAPI.removeProductById(card.dataset.id)
                alert('¡Producto eliminado con exito!');
            } catch (error) {
                alert('¡Ha ocurrido un problema al eliminar el producto!');
            }
        });
    });
}

export const serviciosAPI = {
    showProducts,
    insertProduct
}