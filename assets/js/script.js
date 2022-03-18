//comentario simple: una linea - Shortcut CMD + Shift +7
/* Comentario de más de 
una línea -  Shortcut: Shift+alt+a */

//Se solicita al usuario la cantidad de empleados a registrar
let cantidadEmpleados = parseInt(prompt("Ingresa el número de empleados para los cuales vas a calcular sus aportes"));

/* ---------- Aquí inicializamos vacío el array a utilizar ----- */
let empleados = [];

//Creación de objeto de clase empleado
class Empleado {
    constructor(nombre_recibido, identificacion_recibido, salario_recibido, IBC_calculado, aporteSalud_calculado, aportePension_calculado, aporteARL_calculado){
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

    imprimirEmpleado(){
        return 'Empleado: ${this.nombre} Identificación: ${this.identificacion} Salario: ${this.salario}';
    }
    calcularSalario(){
        this.salarioFinal = this.salario - (this.aporteSalud + this.aportePension + this.aporteARL);
        return 'El salario final quitando los aportes a seguridad social del empleado '+this.nombre+', es de: '+ this.salarioFinal+'$';
    }
    calcularAportes(){
        this.aportes = (this.aporteSalud + this.aportePension + this.aporteARL) ;
        return 'Los aportes a seguridad social a pagar al empleado '+ this.nombre+', es de: '+ this.aportes+'$';
    }
    
}
/* --- Instanciar objeto con una función --- */
function crearEmpleado(){
    const nombre = prompt("Ingresa el nombre del empleado:");
    const identificacion = prompt("Ingresa la identificación del empleado:")
    const salario = prompt("Ingresa el salario del empleado: ");
    const IBC = calcularIBC(salario);
    const aportesSalud = calcularAportes_salud(IBC);
    const aportesPension = calcularAportes_pension(IBC);
    const aportesARL = calcularAportes_ARL(IBC);

    return new Empleado(nombre, identificacion, salario, IBC, aportesSalud, aportesPension, aportesARL);
}
//Definición de funciones
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
/* ------------------------------------- */

// Se solicitan los datos de los empleados de acuerdo a la instrucción inicial del usuario y se envian al array mediante push.
if(cantidadEmpleados > 0){
    for (let i = 0; i < cantidadEmpleados; i++) {
        empleados.push(crearEmpleado());
    }
    //Se presenta por consola la tabla con todos los empleados y el salario final junto con los aportes del primer empleado.
    console.table(empleados);
    console.log(empleados[0].calcularSalario());
    console.log(empleados[0].calcularAportes());
}




