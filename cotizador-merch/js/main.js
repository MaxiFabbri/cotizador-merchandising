const impuestos = 5;
const hoy = new Date();
let cambioDolar = {
    cambio: parseFloat(868.5),
    fecha: "1-1-2024"
}
let cotizaciones = [];
const fechaCorta = fecha => fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear();
let escalasUtilidades = [];

// Actualizo el TC si lo tengo guardado en la LS
let tipoCambioLS = localStorage.getItem('tipoCambio');
if(tipoCambioLS) {
    cambioDolar = JSON.parse(tipoCambioLS)
}

// Creo la Clase Cotizaciones con todos los datos relevantes
class Cotizacion {
    static id=0
    constructor (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo, otrosCostos, precioUnitario) {
        this.id = ++Cotizacion.id
        this.fecha = fecha,
        this.cambioUsado = cambioUsado,
        this.cliente = cliente,
        this.proveedor = proveedor,
        this.producto = producto,
        this.logo = logo,
        this.cantidad = cantidad,
        this.costoUnitario = costoUnitario,
        this.costoFijo = costoFijo,
        this.otrosCostos = otrosCostos,
        this.precioUnitario = precioUnitario     
    }
}

// funcion que busca el tipo de cambio Dolar Actualizado y lo guarda en LocalStorage
const obtenerDolar = async () => {
    let URL = "https://dolarapi.com/v1/dolares/oficial"
    try {
        let solicitud = await fetch(URL);
        let response = await solicitud.json();
        cambioDolar.cambio = response.venta;
        cambioDolar.fecha = fechaCorta(hoy);
        console.log(cambioDolar);
        const cambioEnJson = JSON.stringify(cambioDolar);
        localStorage.setItem('tipoCambio',cambioEnJson);
    } catch (err) {
        console.log("Error detectado, no se pudo recuperar el TC de la API: ", err);
    } 
  }
obtenerDolar();

// Creo una nueva cotización instancia de la Clase "Cotizacion" y la cargo en un array "Cotizaciones" y la muestro en la tabla
function nuevaCotizacion (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo,
     otrosCostos, precioUnitario) {
    const cotizacion = new Cotizacion(fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario,
         costoFijo, otrosCostos, precioUnitario);
    cotizaciones.push(cotizacion);
}

