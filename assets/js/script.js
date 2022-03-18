//comentario simple: una linea - Shortcut CMD + Shift +7
/* Comentario de más de 
una línea -  Shortcut: Shift+alt+a */

//Definición de variables
let cantidadEmpleados = parseInt(prompt("Ingresa el número de empleados para los cuales vas a calcular sus aportes"));

let nombreEmpleado;
let salario;

let IBC;
let aporteSalud;
let aportePension;
let aporteARL;

let salarioFinal;

//Definición de funciones
//Esta funcion solicita los datos del empleado
function datosEmpleado() {
    nombreEmpleado = prompt("Ingresa el nombre del empleado:");
    salario = parseFloat(prompt("Ingresa el salario del empleado:"));
}
//Esta funcion calcula el Indice Base de Cotización (40% en colombia)
const calcularIBC = (salario) => {
    IBC = salario * 0.4;
    return IBC;
};
//Esta funcion calcula los aportes correspondientes a seguridad social
const calcularAportes = (IBC) => {
    aporteSalud = IBC * 0.125; //Los aportes a salud en Colombia son del 12.5%
    aportePension = IBC * 0.16; //Los aportes a pension en Colombia son del 16%
    aporteARL = IBC * 0.00522; //Los aportes a ARL en Colombia son del 0.522%
};
//Esta funcion calcula el salario del empleado restando los aportes obligatorios de seguridad social
const calcularSalario = (salario, aporteSalud, aportePension, aporteARL) => {
    return salario - (aporteSalud + aportePension + aporteARL);
};
//Condicional que evalua que el usuario no haya ingresado un valor negativo o 0
if (cantidadEmpleados <= 0) {
    alert("Ingresa un valor válido");
} else {
    for (let i = 0; i < cantidadEmpleados; i++) {
        datosEmpleado();
        calcularIBC(salario);
        calcularAportes(IBC);
        console.log("Aportes seguridad social del empleado: " + nombreEmpleado);
        console.log("De acuerdo al salario: " + salario + "$, el IBC(40%) es de: " + IBC + "$");
        console.log("Aporte a Salud(12.5%): " + aporteSalud + "$");
        console.log("Aporte a Pensión(16%): " + aportePension + "$");
        console.log("Aporte a ARL(0.522%): " + aporteARL + "$");
        console.log("Total a pagar: " + calcularSalario(salario, aporteSalud, aportePension, aporteARL) + "$");
        console.log("----");
    }
}
