// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




// Listeners
cargaEventListeners();
function cargaEventListeners(){
    // Dispara cuando se presiona "agregar al carrito"
    cursos.addEventListener('click', comprarCurso);

    // Eliminar un curso del carrito:
    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito:
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    
    
}




// Funciones
// funcion que añade el curso al carrito:

function comprarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const curso  = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}
// Lee los datos del curo:
function leerDatosCurso(curso){
    const producto = {};
    let price = document.querySelector('.precio span').textContent;
    let finalPrice = price.slice(1).trim();
    producto.price = finalPrice;
    // console.log(finalPrice);



    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: finalPrice,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    alert('Curso Añadido');
    insertarCarrito(infoCurso);
    mostrarTotal();
}


// Muestra los cursos seleccionados en el carrito:
function insertarCarrito(curso){
    const producto = {};
    let price = document.querySelector('.precio span').textContent;
    let finalPrice = price.slice(1).trim();
    producto.price = finalPrice;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width = 100>
        </td>
        <td>${curso.titulo}</td>
        <td class="cart-item-price">${producto.price}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
}

// Mostrar el total de los precios
function mostrarTotal(){
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");
    // console.log(items);
    items.forEach(function(item){
        total.push(parseFloat(item.textContent));
    });

    // console.log(total);
    const totalMoney = total.reduce(function(total, item){
        total += item;
        return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);

    // console.log(finalMoney);
    // Actualizando los datos en el carrito:
    document.getElementById('total').textContent = finalMoney;
}

// Eliminar carrito del DOM:
function eliminarCurso(e){
    e.preventDefault();
    let curso;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        // console.log( e.target.parentElement.parentElement);
        
    }
    mostrarTotal();
}

// Vaciar Carrito:

function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    mostrarTotal();
    return false;
}