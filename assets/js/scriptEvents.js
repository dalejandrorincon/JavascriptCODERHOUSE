/* Constantes y variables*/
const btnAgregarEmpleado = document.getElementById('agregarEmpleado');
const btnConsultarEmpleado = document.getElementById('consultarEmpleado');
const btnConfirmar = document.getElementById('btnConfirmar');

const btnEliminar = document.getElementById('eliminarDatos');
const btnCancelar = document.getElementById('btnCancelar');
//Selecciona todos los elementos con clase '.volverAlMenu' para reutilizar el boton
const btnVolverAlMenu = document.querySelectorAll('.volverAlMenu');

const tituloMenu = document.querySelector('.tituloMenu');
const menuPrincipal = document.querySelector('.menuPrincipal');
const mostrarDatos = document.querySelector('.mostrarDatos');
const mostrarFormularioRegistro = document.querySelector('.mostrarFormularioRegistro');
const selectMoneda = document.querySelector('#tipoMoneda')
const btnCambiarMoneda = document.querySelector('#cambiarMoneda');

const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const salario = document.getElementById('salario');

//API https://currency.getgeoapi.com/ que permite realizar la conversión de monedas
//const API_KEY = '996cbc61503939c0545f7924ae0f41907e5e461e';
const API_KEY = 'f576e294cdd42858cb7908125432002312b8d18f'
let monedaBase = '';

//Creación de objeto de clase empleado
class Empleado {
    constructor(nombre_recibido, identificacion_recibido, salario_recibido) {
        this.nombre = nombre_recibido;
        this.identificacion = identificacion_recibido;
        this.salario = parseFloat(salario_recibido);
        this.IBC = this.calcularIBC(this.salario);
        this.aporteSalud = this.calcularAportes_salud(this.IBC);
        this.aportePension = this.calcularAportes_pension(this.IBC);
        this.aporteARL = this.calcularAportes_ARL(this.IBC);
        this.monedaBase = monedaBase;
    }
    saludar = () => { console.log("Mi nombre es "+this.nombre)}
    //Se agregan las funciones que calculan valores a la clase Empleado
    calcularIBC(salario){
        return salario * 0.4;
    }
    calcularAportes_salud(IBC){
        return IBC * 0.125; //Los aportes a salud en Colombia son del 12.5%
    }
    calcularAportes_pension(IBC){
        return IBC * 0.16; //Los aportes a pension en Colombia son del 16%
    }
    calcularAportes_ARL(IBC){
        return IBC * 0.00522; //Los aportes a ARL en Colombia son del 0.522%
    }
}
/* --- Definición de funciones--- */
/*Esta función valida inicialmente lo que se encuentra en el LocalStorage
en caso de no encontrar datos, retorna un array vacio*/
function cargarListadoEmpleados() {
    let listadoEmpleados = JSON.parse(localStorage.getItem('listadoEmpleados'));
    //Sugar Syntax Nullish para validar si el LocalStorage está vacio
    return listadoEmpleados ?? [];
}
//Esta funcion es la encargada de crear el empleado, junto con los calculos de aportes y agregarlo al array
function crearEmpleado() {
    
    // Esta función recupera el array guardado en el LocalStorage, para validar datos.
    let listadoEmpleados = cargarListadoEmpleados();
    //Condicional que valida que el usuario no haya dejado algún campo del formulario vacio.
    if(nombre.value != "" && identificacion.value != "" && salario.value != ""){
        //Se hace la carga al array listadoEmpleados de la clase Empleado.
        listadoEmpleados.push(new Empleado(nombre.value, identificacion.value, salario.value));
        // Se actualiza el LocalStorage con los datos
        localStorage.setItem("listadoEmpleados", JSON.stringify(listadoEmpleados));
        
        //Se utiliza la libreria SweetAlerts para confirmar que se cargo correctamente el empleado.
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            icon: 'success',
            title: 'Empleado agregado correctamente',
            showCancelButton: true,
            confirmButtonText: 'Agregar nuevo empleado',
            cancelButtonText: 'Regresar al menú',
        }).then((result)=>{
            //Operador ternario dentro del Swal
            result.isConfirmed ? limpiarFormulario() : volverAlMenu(); 
        });
        //Finaliza limpiando el formulario en caso de tener campos
        limpiarFormulario();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops.. No llenaste todos los campos',
            showCloseButton: true,
        })
    }

    
}
function borrarDatos(){
    monedaBase = "COP";
    localStorage.clear();
    //Se utiliza la libreria SweetAlerts para confirmar que se eliminaron correctamente los datos.
    Swal.fire({
        icon: 'success',
        title: 'Datos eliminados',
    });
    mostrarListado(cargarListadoEmpleados());
    
}
const limpiarFormulario = () => {
    // Limpia el formulario
    document.getElementById("formularioRegistro").reset();
}
//Esta función crea los elementos de la tabla que se agregaran al DOM
function armarTabla(elemento) {
    // Se crea el TR para asignar cada uno de los valores del empleado
    const elementoTabla = document.createElement("tr");
    
    // Se crean los campos de la tabla asociados a cada valor del elemento.
    const nombreEmpleado = document.createElement("td");
    nombreEmpleado.textContent = `${elemento.nombre}`;
    nombreEmpleado.classList.add('text-center');
    elementoTabla.appendChild(nombreEmpleado);

    const identificacionEmpleado = document.createElement("td");
    identificacionEmpleado.textContent = `${elemento.identificacion}`;
    elementoTabla.appendChild(identificacionEmpleado);

    const salarioEmpleado = document.createElement("td");
    salarioEmpleado.textContent = `${elemento.salario}  ${elemento.monedaBase}`;
    elementoTabla.appendChild(salarioEmpleado);

    const IBCEmpleado = document.createElement("td");
    IBCEmpleado.textContent = `${elemento.IBC} ${elemento.monedaBase}`;
    elementoTabla.appendChild(IBCEmpleado);

    const aporteSaludEmpleado = document.createElement("td");
    aporteSaludEmpleado.textContent = `${elemento.aporteSalud} ${elemento.monedaBase}`;
    elementoTabla.appendChild(aporteSaludEmpleado);

    const aportePensionEmpleado = document.createElement("td");
    aportePensionEmpleado.textContent = `${elemento.aportePension} ${elemento.monedaBase}`;
    elementoTabla.appendChild(aportePensionEmpleado);

    const aportARLEmpleado = document.createElement("td");
    aportARLEmpleado.textContent = `${elemento.aporteARL} ${elemento.monedaBase}`;
    elementoTabla.appendChild(aportARLEmpleado);

    //Agrega el botón de eliminar, haciendo uso de la función onClick para borrar un solo elemento
    const eliminarEmpleado = document.createElement("td");
    eliminarEmpleado.innerHTML = `<button id="eliminar${elemento.identificacion}"  onclick="eliminarEmpleado('eliminar${elemento.identificacion}')" type="button" class="btn btn-dark">Eliminar</button>`
    elementoTabla.appendChild(eliminarEmpleado);

    return elementoTabla;
}
//Esta función recibe el id dinámico que tiene cada elemento en el botón eliminar
function eliminarEmpleado(identificacionEmpleado){
    console.log(`Eliminar empleado con id: ${identificacionEmpleado}`);
    let listadoEmpleados = JSON.parse(localStorage.getItem("listadoEmpleados"));
    // Buscamos el empleado en el localStorage
    let buscarEmpleado = listadoEmpleados.find((elemento) => `eliminar${elemento.identificacion}` == identificacionEmpleado);
    console.log(`El empleado a eliminar se llama: ${buscarEmpleado.nombre}`);
    //Buscamos el index dentro del array listadoEmpleados
    let indexEmpleado = listadoEmpleados.findIndex((element) => {
        if (element.identificacion === buscarEmpleado.identificacion) {
            return true;
        }
    });
    console.log(`index del empleado: ${indexEmpleado}`);
    listadoEmpleados.splice(indexEmpleado,1);
    
    //En caso de ser el ultimo elemento, le da valor de array vacio.
    if (listadoEmpleados.length === 0) {
        monedaBase = "COP";
        listadoEmpleados = [];
    }
    // Se actualiza el LocalStorage con los datos
    localStorage.setItem("listadoEmpleados", JSON.stringify(listadoEmpleados));
    //Se hace uso de la libreria Toastify para notificar que el empleado se elimina correctamente
    Toastify({
        text: "Empleado eliminado correctamente",
        duration: 3000,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        close: true,
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        gravity: top,
    }).showToast();
    mostrarListado(cargarListadoEmpleados());
}
function mostrarListado(listadoEmpleados) {
    // Obtenemos el id del contenedor del listado de empleados y el elemento TBODY de la misma
    let listado = document.getElementById('listaDeEmpleados').getElementsByTagName('tbody')[0];
    // Se limpia el contenido para evitar duplicaciones en la impresión de datos.
    listado.textContent = "";
    //Para cada uno de los elementos del array se consutryen los elementos a crear en el DOM con la función armarTabla();
    listadoEmpleados.forEach((elemento) => {
        listado.appendChild(armarTabla(elemento));
    });
}
//Esta función se encarga de agregar y remover las clases correspondientes para mostrar el menu
function mostrarMenu() {
    tituloMenu.classList.remove('oculta');
    tituloMenu.classList.add('visible');
    menuPrincipal.classList.remove('oculta');
    menuPrincipal.classList.add('visible');
};
//Esta función se encarga de agregar y remover las clases correspondientes para ocultar el menu
function ocultarMenu() {
    tituloMenu.classList.add('oculta');
    tituloMenu.classList.remove('visible');
    menuPrincipal.classList.add('oculta');
    menuPrincipal.classList.remove('visible');
};
//Esta función se encarga de agregar y remover las clases correspondientes para regresar al menu
function volverAlMenu() {
    ocultarFormulario();
    ocultarTablaEmpleados();
    mostrarMenu();
};
//Esta función se encarga de agregar y remover las clases correspondientes para mostrar el formulario de registro de empleados
function mostrarFormulario() {
    mostrarFormularioRegistro.classList.remove('oculta');
    mostrarFormularioRegistro.classList.add('visible');
};
//Esta función se encarga de agregar y remover las clases correspondientes para ocultar el formulario de registro de empleados
function ocultarFormulario() {
    mostrarFormularioRegistro.classList.add('oculta');
    mostrarFormularioRegistro.classList.remove('visible');
};
//Esta función se encarga de agregar y remover las clases correspondientes para mostrar la tabla con el listado completo.
function mostrarTablaEmpleados() {
    mostrarDatos.classList.remove('oculta');
    mostrarDatos.classList.add('visible');
};
//Esta función se encarga de agregar y remover las clases correspondientes para ocultar la tabla con el listado completo.
function ocultarTablaEmpleados() {
    mostrarDatos.classList.add('oculta');
    mostrarDatos.classList.remove('visible');
};
/*-----Eventos-----*/
btnConfirmar.addEventListener('click', crearEmpleado);
btnCancelar.addEventListener('click', limpiarFormulario);
/*Fetch*/
//Se crea una función con el evento click, para realizar el cambio de moneda. Por defecto el valor de moneda es COP 
btnCambiarMoneda.addEventListener('click', () => {
    //A través del Select que se encuentra en el index, se captura el valor al cuál se cambiará la moneda.
    let monedaCambio = selectMoneda.value;
    //a través de getItem traigo nuevamente el array con el listado de Empleados, para posteriormente poder modificar valores
    let listadoEmpleados = JSON.parse(localStorage.getItem("listadoEmpleados"));
    //valido si el listado no esta vacio 
    if(listadoEmpleados != null){
        console.log(listadoEmpleados.length)
        //Cuando el listado de Empleados no está vacio, tomo el valor de la MonedaBase del primer elemento del LocalStorage ya que este valor se cambia para todos
        monedaBase = listadoEmpleados[0].monedaBase;
        console.log(monedaBase);
        //Mediante un ForEach recorro todo el Listado de Empleados para modificar los valores asociados a la moneda
        listadoEmpleados.forEach((elemento)=>{
            //Creo un objeto de tipo empleado para poder hacer uso de las funciones de la clase y así solo usar la API para cambiar un valor, los demas se calculan nuevamente
            let empleado = new Empleado(listadoEmpleados[listadoEmpleados.indexOf(elemento)].nombre,listadoEmpleados[listadoEmpleados.indexOf(elemento)].identificacion, listadoEmpleados[listadoEmpleados.indexOf(elemento)].salario);
            //Un saludito del empleado
            console.log(empleado.saludar());
            //Para el fetch uso template strings que me permitan usar valores dinámicos de acuerdo a la selección
            fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=${monedaBase}&to=${monedaCambio}&amount=${elemento.salario}`)
            .then((response)=> response.json())
            .then((data)=> {
                console.log(`Salario actualizado: ${data.rates[monedaCambio].rate_for_amount}`);
                //Este es el valor que retorna la API
                elemento.salario = parseFloat(data.rates[monedaCambio].rate_for_amount).toFixed(2);
                //Los demás valores se calculan nuevamente con las funciones de la clase Empleado
                elemento.IBC = parseFloat(empleado.calcularIBC(elemento.salario).toFixed(2));
                elemento.aporteSalud = parseFloat(empleado.calcularAportes_salud(elemento.IBC).toFixed(2));
                elemento.aportePension = parseFloat(empleado.calcularAportes_pension(elemento.IBC).toFixed(2));
                elemento.aporteARL = parseFloat(empleado.calcularAportes_ARL(elemento.IBC).toFixed(2));
                //Actualizo el valor de MonedaBase para que cuando el usuario salga del aplicativo y quiera regresar, no le vaya a tomar por defecto COP, sino el ultimo valor que utilizo
                elemento.monedaBase = monedaCambio;
                //Con setItem actualizo los valores del Storage
                localStorage.setItem("listadoEmpleados", JSON.stringify(listadoEmpleados));
                //Recargo la visualización de la tabla
                mostrarListado(cargarListadoEmpleados());
            })
        })
        //En caso de estar vacio solo lo notifico por consola.
    }else{
        //Para evitar que el valor de monedaBase quede vacio cuando el usuario sale del aplicativo. lo que hago es inicializarlo en COP
        monedaBase = "COP";
        console.log("El Storage esta vacio");
    }
    console.log(`From: ${monedaBase} to: ${monedaCambio}`);
    //Actualiza el valor base de la Moneda, para que al hacer un nuevo análisis tome el valor actual en el que esta el usuario y el Storage
    monedaBase = monedaCambio;
})

//Se agrega un forEach para aplicar la accion de volver al menu a todos los botones con clase volverAlMenu
btnVolverAlMenu.forEach( btn => {
    btn.onclick = () => volverAlMenu()
})
btnEliminar.addEventListener('click', borrarDatos);
btnAgregarEmpleado.addEventListener('click', () => {
    ocultarMenu();
    mostrarFormulario();
});
btnConsultarEmpleado.addEventListener('click', () => {
    mostrarListado(cargarListadoEmpleados());
    ocultarMenu();
    mostrarTablaEmpleados();
});

/*Invocación de la función mostrar listado, para que cargue los elementos del LocalStorage*/
mostrarListado(cargarListadoEmpleados());
