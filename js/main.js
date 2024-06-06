import { serviciosAPI } from "./services.js";
import { validations } from "./validations.js";

// referencing HTML elements
const containerProducts = document.querySelector('.products__section__container');
const errorProducts = document.querySelector('.products__section__empty__message');
const inputs = document.querySelectorAll('input[type=text]');
const btnSubmit = document.querySelector('.input__submit__btn');
const btnClean = document.querySelector('.input__clean__btn');

// load products
serviciosAPI.showProducts(containerProducts, errorProducts);

// removes error messages from input fields 
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

// Cleans the inputs values
function cleanInputs(e) {
    e.preventDefault();
    inputs.forEach(input => {
        input.value = ''
    });
}

btnClean.addEventListener('click', (e) => cleanInputs(e));

// Manage the product creation process
btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let dataValid = true;

    // Validate each input field
    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;

        if (validations.validateEmptyFields(input.value)) {
            errorElement.textContent = `¡El campo ${input.name} no puede estar vacio!`;
            errorElement.style.display = 'block';
            dataValid = false;
        } else if (input.getAttribute('class') == 'input__image') {
            if (!validations.urlStartsWithHTTPS(input.value)) {
                errorElement.textContent = `¡La URl debe empezar con la secuencia https:// para ser reconocida como una URL valida!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        } else if (input.getAttribute('class') == 'input__cost') {
            if (!validations.priceIsNumeric(input.value)) {
                errorElement.textContent = `¡El precio debe ser un valor númerico superior a cero para ser reconocido como valido!`;
                errorElement.style.display = 'block';
                dataValid = false;
            }
        }
    })

    // if the input fields are valid, the data is sent to the API
    if (dataValid) {
        const productData = {}
        inputs.forEach(input => { // create the object
            productData[input.name] = input.value;
        });

        try {
            await serviciosAPI.insertProduct(productData);
        } catch (error) {
            console.log(error);
        }
    }

});
