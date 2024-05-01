//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);//Muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
});

//Event Listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();  
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
    console.log(datosBusqueda);
});



//Funciones
function mostrarAutos(autos) {

    LimpiarHTML(); //Elimina el HTML previo
    autos.forEach( auto => {
       
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color:${color}
        
        `;
        //Insertar en el html
        resultado.appendChild(autoHTML);
    })
}

//Limpiar html
function LimpiarHTML () {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect() {
    for( let i = max; i >= min; i--) {
        const opcion = document.createElement('option')
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//Agrega las opciones de año al select
    }
}

//Funcion q filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
   

    if (resultado.length) {
        mostrarAutos(resultado);
    }else {
        noResultado();
    }
}

function noResultado() {

    LimpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, Intenta con otros términos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca (auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
    
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
return auto;
}


//APUNTES PROYECTO
//Al cargar el formulario cargara una funcion que mostrara la lista de autos.
/**
 * Se crea la funcion mostrarAutos y se va a iterar con un forEach en la lista de autos.Se crea luego un pararfo para cada automovil. LLamamos a autoHTML con .textcontent para q se asigne las propiedades q ya hay en la bd. Con el dic que contiene el id resultado, se van a ir añadiendo los elementos q contiene autoHTML.
 * 
 * GENERAR UN SELECT DE AÑOS
 * Se crea una variable para traer el select de los años. Se crea const max = new Date().getFullYear(); q va a traer el año actual. y const min = max - 10; que va generar el año actual menos 10 años
 * Se crea la funcion llenarSelect y le pedimos por medio de un for inicializando la variable i q sea igual a max, para q tome el año actual y que i sea mayor o igual al año minimo, demodo q se muestre hacia atras el resultado y con i-- le volvemos a indicar esto.
 * 
 * Ahora se crea una variable llamada opocion que va a ser igual a un elemnto option el cual es una etiqueta de los select. Luego llamamos la variable opcion y le agregamos el valor de i, osea el value va a ser la lista de años. Tambien le añadimos su texto con opcion.textContent = i; y ahora agregamos las opciones de año al select por medio de appendchild, year.appendChild(opcion);
 * 
 * LEER EL VALOR DE LA MARCA DEL AUTOMOVIL Y QUE SE GUARDE
 * Es necesario primero leer los datos q el usuario esta seleccionando en el formulario.Enytonces primero se va a generar un objeto con la busqueda y ahi se van colocando los parametros de la busqueda. Cada q el usuario escriba o seleccione se va llenando alguna propiedad del objeto.
 * 
 * Hay q crear selectores para cada uno de los selects que hay en la interfaz, para esto se mueve la constante year hacia arriba y arriba de este saldra la de marca para q vayan saliendo en orden y asi para todos los demas campos.
 * 
 * Ahora se crean Event Listener para los select de busqueda, donde se llama la propiedad del objeto y con el addeventlisterner se le aplica el parametro q si cambia la seleccion y con el evento click, pase la informacion por medio de e.target.value; a el objeto de datosBusqueda.marca y asi para cada propiedad.
 * 
 * marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    
});

Cada que se hagan cambios en los event listeners se va a mandar a llamar una funcion q se va a encargar de filtrar los autos por medio de filter, aca se usara una funcion de alto nivel, es decir, una funcion q toma a otra funcion.

Se crea una funcion filtrarMarca q va a iterar sobre todos los objetos q tenemos en el arreglo de automiviles y va a comparar la marca unicamente. Para filtrar solo una marca se debe filtrar unicamente una marca, se puede hacer con un if ya q al momento de hacer la busqueda pueden estar vacios y se va a buscar si datosBusuqeda.marca tiene algo es decir esa parte del objeto no esta vacia, entonces se va a ejecutar el filtrado y esto va a retornar la marca del auto con return auto.marca === datosBusqueda.marca;.

En caso de q el usuario no haya seleccionado nada se retorna el automovil completo con return auto; para que no se pierdan las referencias a los demas autos, pero si estan filtrados me interesan unicamente los q estoy filtrando.
 * 
 * 
 * 
 * //Funcion q filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca)
    console.log(resultado);
}

function filtrarMarca (auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
    
}

//FILTRAR POR AÑO
ES basicamente el mismo codifo q para la marca donde se filtra por una marca y debe retornar solo la marca q se le indique. Con el año es igual, pero el valor del año es leido como un string por lo tanto, hay q pasarlo a un entero y eso se puede hacer desde el momento en el q se va agregando a los datos de busqueda y desde ahi convertirlo a numero.

    year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

MOSTRAR LOS RESULTADOS DEL FILTRADO EN HTML
Ya se estan aplicando los filtros pero en el html no pasa nada y eso pasa por q una vez se obtiene un resultado, tenemos que volver a llamar el html.
En la funcion filtrarAutos, se llama la funcion mostrarAutos y se le pasa el resultado de esos filtros, osea la constante resultado.
Vamos a la funcion mostrarAutos y se le pasa alli el parametro autos.Luego vamos a los eventos y en mostrarAutos, se le pasa tambien el parametro autos. Pero ahora se filtran los autos pero quedan en la parte inferior. Para solucionar vemnos q en la funcoin mostrarAutos se esta usando appendChild y este no va a borrar el contenido previo, tenemos q borrarlo nosotros.

Para eso se crea una funcion que limpie el html y se manda a llamar antes de recorrer e imprimir el html, osea en la funcion mostrarAutos. La funcion para limpiar se hace con un while q va a indicar q mientras alla algo lo elimine. Y despues va a ir iterando y agregando nuevo contenido.

function LimpiarHTML () {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

 */