/* Constantes y variables*/
let empleados = [];

const btnAgregarEmpleado = document.getElementById('agregarEmpleado');
const btnConsultarEmpleado = document.getElementById('consultarEmpleado');
const btnConfirmar = document.getElementById('btnConfirmar');
const btnVolverAlMenu = document.getElementById('volverAlMenu');

const tituloMenu = document.querySelector('.tituloMenu');
const menuPrincipal = document.querySelector('.menuPrincipal');
const mostrarDatos = document.querySelector('.mostrarDatos');
const mostrarFormularioRegistro = document.querySelector('.mostrarFormularioRegistro');


const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const salario = document.getElementById('salario');

//Creación de objeto de clase empleado
class Empleado {
    constructor(nombre_recibido, identificacion_recibido, salario_recibido, IBC_calculado, aporteSalud_calculado, aportePension_calculado, aporteARL_calculado) {
        this.nombre = nombre_recibido;
        this.identificacion = identificacion_recibido;
        this.salario = parseFloat(salario_recibido);
        this.IBC = IBC_calculado;
        this.aporteSalud = aporteSalud_calculado;
        this.aportePension = aportePension_calculado;
        this.aporteARL = aporteARL_calculado;
        this.salarioFinal;
        this.aportes;
    }
    imprimirEmpleado() {
        return `Empleado: ${this.nombre}\nIdentificación: ${this.identificacion}\nSalario: ${this.salario}`;
    }
    calcularSalario() {
        this.salarioFinal = this.salario - (this.aporteSalud + this.aportePension + this.aporteARL);
        return `El salario final quitando los aportes a seguridad social del empleado ${this.nombre}, es de: ${this.salarioFinal}$`;
    }
    calcularAportes() {
        this.aportes = (this.aporteSalud + this.aportePension + this.aporteARL);
        return `El aporte a seguridad social a pagar al empleado ${this.nombre}, es de: ${this.aportes}$`;
    }

}

/* --- Definición de funciones--- */
function crearEmpleado() {
    const IBC = calcularIBC(salario.value);
    const aportesSalud = calcularAportes_salud(IBC);
    const aportesPension = calcularAportes_pension(IBC);
    const aportesARL = calcularAportes_ARL(IBC);

    alert("Empleado registrado");

    return new Empleado(nombre.value, identificacion.value, salario.value, IBC, aportesSalud, aportesPension, aportesARL);
}
const calcularIBC = (salario) => {
    IBC = salario * 0.4;
    return IBC;
};
//Estas funciones calculan los aportes correspondientes a seguridad social
const calcularAportes_salud = (IBC) => {
    aporteSalud = IBC * 0.125; //Los aportes a salud en Colombia son del 12.5%
    return aporteSalud;
};
const calcularAportes_pension = (IBC) => {
    aportePension = IBC * 0.16; //Los aportes a pension en Colombia son del 16%
    return aportePension;
};
const calcularAportes_ARL = (IBC) => {
    aporteARL = IBC * 0.00522; //Los aportes a ARL en Colombia son del 0.522%
    return aporteARL;
};

/*-----Invocación de funciones-----*/
function mostrarMenu(){
    tituloMenu.classList.remove('oculta');
    tituloMenu.classList.add('visible');
    menuPrincipal.classList.remove('oculta');
    menuPrincipal.classList.add('visible');
};
function ocultarMenu(){
    tituloMenu.classList.add('oculta');
    tituloMenu.classList.remove('visible');
    menuPrincipal.classList.add('oculta');
    menuPrincipal.classList.remove('visible');
};
function volverAlMenu(){
    ocultarFormulario();
    ocultarTablaEmpleados();
    mostrarMenu();
};
function mostrarFormulario(){
    mostrarFormularioRegistro.classList.remove('oculta');
    mostrarFormularioRegistro.classList.add('visible');
};
function ocultarFormulario(){
    mostrarFormularioRegistro.classList.add('oculta');
    mostrarFormularioRegistro.classList.remove('visible');
};
function mostrarTablaEmpleados(){
    mostrarDatos.classList.remove('oculta');
    mostrarDatos.classList.add('visible');
};
function ocultarTablaEmpleados(){
    mostrarDatos.classList.add('oculta');
    mostrarDatos.classList.remove('visible');
};
btnVolverAlMenu.addEventListener('click',()=>{
    volverAlMenu();
});
btnAgregarEmpleado.addEventListener('click',()=>{
    ocultarMenu();
    mostrarFormulario();
});
btnConsultarEmpleado.addEventListener('click',()=>{
    console.table(empleados);
    crearHTMLInfoEmpleados(empleados);
    ocultarMenu();
    mostrarTablaEmpleados();
});
btnConfirmar.addEventListener('click',()=>{
    empleados.push(crearEmpleado());
    ocultarFormulario();
    mostrarMenu();
});
function crearHTMLInfoEmpleados(empleados) {
    var tablaEmpleados = `<table>
    <thead>
    <tr>
    <th>Nombre</th>
    <th>Identificación</th>
    <th>Salario</th>
    <th>IBC</th>
    <th>Aportes a Salud</th>
    <th>Aportes a Pension</th>
    <th>Aportes a ARL</th>
    </tr>
    </thead>`;
    for (var CELL of empleados) {  
        tablaEmpleados += `<tr>
        <td>${CELL.nombre}</td>
        <td>${CELL.identificacion}</td>
        <td>${CELL.salario}$</td>
        <td>${CELL.IBC}$</td>
        <td>${CELL.aporteSalud}$</td>
        <td>${CELL.aportePension}$</td>
        <td>${CELL.aporteARL}$</td>
        </tr>`; 
    }
    tablaEmpleados += "</table>";
    document.getElementById("listaDeEmpleados").innerHTML = tablaEmpleados;

}
