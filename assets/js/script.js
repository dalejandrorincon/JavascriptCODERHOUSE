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
/* Constantes y variables*/
let empleados = [];

/* --- Definición de funciones--- */

function menuGeneral() {
    let accionUsuario = prompt(`Seleccione la opción que desea realizar, o escriba 'ESC' para finalizar
    1: Agregar empleados.
    2: Consultar datos. `);
    if(accionUsuario < 1 || accionUsuario > 2){
        alert('Selecciona una opción válida');
    }else{
        if (accionUsuario == 1) {
            // Se solicitan los datos del empleado y se envian al array mediante push.
            let otroEmpleado = true;
            while(otroEmpleado){
                empleados.push(crearEmpleado());
                otroEmpleado = confirm('Desea agregar oto empleado?');
            }
            menuGeneral();
        }
        else if (accionUsuario == 2) {
            /*Se presenta por consola la tabla con todos los empleados y el salario final junto con los aportes del primer empleado.*/
            if(empleados.length > 0){
                let opcionesBusqueda = prompt(`Seleccione la opción que desea realizar, o escriba 'ESC' para finalizar
                0: Imprimir en consola todos los empleados.
                1: Consultar datos de un empleado específico.
                2: Filtrar de acuerdo al salario `);
                    if(opcionesBusqueda == 0){
                        console.table(empleados);
                    }
                    else if(opcionesBusqueda == 1){
                        let identificacionABuscar = prompt('Ingresa el número de identificación del empleado: ');
                        let buscarEmpleado = empleados.find((elemento) => elemento.identificacion == identificacionABuscar);
                        console.table(buscarEmpleado);
                        alert(empleados[empleados.indexOf(buscarEmpleado)].imprimirEmpleado());
                    }
                    else if(opcionesBusqueda == 2){
                        let salarioAFiltrar = prompt('Ingresa el salario a filtrar: ');
                        let salariosFiltrados = empleados.filter((elemento) => elemento.salario > salarioAFiltrar);
                        console.table(salariosFiltrados);
                    }else{
                        alert('Selecciona una opción válida');
                        menuGeneral();
                    }
                
            }
            else{
                alert('La tabla de empleados se encuentra vacia');
                menuGeneral();
            }
            
        }
    }
    
}
function crearEmpleado() {
    const nombre = prompt("Ingresa el nombre del empleado:");
    const identificacion = prompt("Ingresa la identificación del empleado:")
    const salario = prompt("Ingresa el salario del empleado: ");
    const IBC = calcularIBC(salario);
    const aportesSalud = calcularAportes_salud(IBC);
    const aportesPension = calcularAportes_pension(IBC);
    const aportesARL = calcularAportes_ARL(IBC);

    return new Empleado(nombre, identificacion, salario, IBC, aportesSalud, aportesPension, aportesARL);
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

// let empleadoEncontrado = empleados.find((elemento) => {
//     if(elemento.nombre == nombreABuscar){
//         console.log("nombre");
//     }
// });
/* ------------------------------------- */
/*-----Invocación de funciones-----*/
menuGeneral();





