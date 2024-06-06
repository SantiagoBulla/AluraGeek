import { serviciosAPI } from "./servicios.js";
import { validaciones } from "./validaciones.js";

// Renderizar productos
const containerProductos = document.querySelector('.products__section__container');
const errorProductos = document.querySelector('.products__section__empty__message');
const inputs = document.querySelectorAll('input[type=text]');
serviciosAPI.listarProductos(containerProductos, errorProductos);

inputs.forEach(input => {
    input.addEventListener('keypress', () => {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
    });
    input.addEventListener('blur', () => {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
    });
});

function limpiarInputs(e) {
    e.preventDefault();
    inputs.forEach(input => {
        input.value = ''
    });
}

// Crear un nuevo producto
const btnEnviar = document.querySelector('.input__submit__btn');
const btnLimpiar = document.querySelector('.input__clean__btn');
btnEnviar.addEventListener('click', async (e) => {
    e.preventDefault();
    let dataValid = true;

    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;

        if (validaciones.validarCamposVacios(input.value)) {
            errorElement.textContent = `¡El campo ${input.name} no puede estar vacio!`;
            errorElement.style.display = 'block';
            dataValid = false;
        } else if (input.getAttribute('class') == 'input__image') {
            if (!validaciones.urlStartsWithHTTPS(input.value)) {
                errorElement.textContent = `¡La URl debe empezar con la secuencia https:// para ser reconocida como una URL valida!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        } else if (input.getAttribute('class') == 'input__cost') {
            if (!validaciones.precioNumerico(input.value)) {
                errorElement.textContent = `¡El precio debe ser un valor númerico superior a cero para ser reconocido como valido!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        }
    })


    if (dataValid) {
        const productData = {}
        inputs.forEach(input => {
            productData[input.name] = input.value;
        });

        try {
            const response = await serviciosAPI.crearProducto(productData);
            alert('¡Producto ingresado con exito!');
        } catch (error) {
            alert('¡Ha ocurrido un problema al ingresar el producto!');
        }
    }

});

btnLimpiar.addEventListener('click', (e) => limpiarInputs(e));