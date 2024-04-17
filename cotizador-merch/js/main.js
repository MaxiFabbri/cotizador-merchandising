const impuestos = 5
const hoy = new Date()
let cambioDolar = parseFloat(868.5)
let cotizaciones = []
const fechaCorta = fecha => fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear()

// defino la tabla utilidades segun el costo total
const escalasUtilidades = [
    {hasta: 408, utilidad: 30 , minimo: 82},
    {hasta: 1429, utilidad: 28 , minimo: 188},
    {hasta: 2041, utilidad: 25 , minimo: 597},
    {hasta: 4082, utilidad: 22 , minimo: 729},
    {hasta: 9999999999, utilidad: 20 , minimo: 1230}
]

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
        let solicitud = await fetch(URL)
        let response = await solicitud.json()
        cambioDolar = response.venta
        const cambioEnJson = JSON.stringify(cambioDolar)
        localStorage.setItem('tipoCambio',cambioEnJson)
    } catch (err) {
        console.log("Error detectado, no se pudo recuperar el TC de la API: ", err)
        try{
            let tipoCambioLS = localStorage.getItem('tipoCambio')
            cambioDolar = tipoCambioLS.json
        } catch{
            console.log("Error detectado, no se pudo recuperar el TC de la LS: ", err)
        }
    } 
  }
obtenerDolar()

// funcion que agrega de a 1 cotizacion a la tabla HTML en forma de <tr> Table Row
let mostrarCotizaciones = document.getElementById("cuerpoDeTabla")
function agregarCotizATabla(cotiz) {
    let fila = document.createElement("tr")
    fila.innerHTML = `<td>${cotiz.cambioUsado}</td>
                      <td>${cotiz.fecha}</td>
                      <td>${cotiz.cliente}</td>
                      <td>${cotiz.proveedor}</td>
                      <td>${cotiz.producto}</td>
                      <td>${cotiz.logo}</td>
                      <td>${(cotiz.cantidad)}</td>
                      <td>$ ${(cotiz.costoUnitario*cotiz.cambioUsado).toFixed(2)}</td>
                      <td>$ ${(cotiz.costoFijo*cotiz.cambioUsado).toFixed(2)}</td>
                      <td>$ ${(cotiz.otrosCostos*cotiz.cambioUsado).toFixed(2)}</td>
                      <td>$ ${(cotiz.precioUnitario*cotiz.cambioUsado).toFixed(2)}</td>`
    mostrarCotizaciones.appendChild(fila)
}

// Reviso el Local Storage y recupero los datos de cotizaciones y los pongo en el Array Cotizaciones
let cotizacionesLS = localStorage.getItem('cotizaciones')
if (cotizacionesLS) {
    let cotizacionesProv =[]
    cotizacionesProv = JSON.parse(cotizacionesLS)
    cotizacionesProv.forEach(cotizEl => {
        nuevaCotizacion(cotizEl.fecha, cotizEl.cambioUsado, cotizEl.cliente, cotizEl.proveedor, cotizEl.producto, cotizEl.logo, cotizEl.cantidad, cotizEl.costoUnitario, cotizEl.costoFijo, cotizEl.otrosCostos, cotizEl.precioUnitario)
    });
} else {
    cotizaciones = []
}


// Creo el evento sobre el boton cotizar
// let cotizar = document.getElementById("botonCotizar")
// cotizar.onclick = () => { inputDatos()}

// // Input de Datos por HTML
// function inputDatos() {
//     let cambioUsado = cambioDolar
//     let fecha = fechaCorta(hoy)
//     let cliente = (document.getElementById("inCliente")).value
//     let proveedor = (document.getElementById("inProveedor")).value
//     let producto = (document.getElementById("inProducto")).value
//     let logo = (document.getElementById("inLogo")).value
//     let cantidad = (document.getElementById("inCantidad")).value
//     let costoUnitario = ((document.getElementById("inCostoUnitario")).value/cambioUsado)
//     let costoFijo = ((document.getElementById("inCostoFijo")).value/cambioUsado)
//     let otrosCostos = ((document.getElementById("inOtrosCostos")).value/cambioUsado)
    
//     // llamo a la funcion que Calcula el precio calculoPrecio
//     let precioUnitario = calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos)

//     // Muestro el precio en la Web
//     document.getElementById("outPrecioUnitario").innerText = (precioUnitario*cambioUsado).toFixed(2)
    
//     nuevaCotizacion (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo, otrosCostos, precioUnitario)

//     const cotizacionesEnJson = JSON.stringify(cotizaciones)
//     localStorage.setItem('cotizaciones',cotizacionesEnJson)
// }

// Creo una nueva cotización instancia de la Clase "Cotizacion" y la cargo en un array "Cotizaciones" y la muestro en la tabla
function nuevaCotizacion (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo,
     otrosCostos, precioUnitario) {
    const cotizacion = new Cotizacion(fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario,
         costoFijo, otrosCostos, precioUnitario)
    cotizaciones.push(cotizacion)
    agregarCotizATabla(cotizacion)
}

// Funcion que calcula el precio en base a los datos
function calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos){
    // calculo el costo Neto y Total
    let costoNeto = ((cantidad*costoUnitario)+costoFijo)
    let costoTotal = (costoNeto+otrosCostos)
    // Busco en la tabla de escalas de Utilidad, la correspondiente a este costo Neto
    const utilidadDeseada = escalasUtilidades.find(escala => costoNeto < escala.hasta)
    let porcentajeUtilidad = parseInt(utilidadDeseada.utilidad)
    let utilidadMinima = parseInt(utilidadDeseada.minimo)

    // calculo el precio Unitario Probable por rentabilidad de %
    let precioUnitarioPorcentaje = (costoTotal/(1-((porcentajeUtilidad+impuestos)/100)))/cantidad
    
    // Calculo impuesto Estimado por la rentabilidad de %
    let impuestoEstimado = ((precioUnitarioPorcentaje*cantidad)*(impuestos/100))

    // calculo la utilidad con el precio Unitario Probable por rentabilidad de % contra la utilidad minima y defino la utilidad
    let utilidadPorPorcentaje = ((precioUnitarioPorcentaje*cantidad)-costoTotal-impuestoEstimado)
    
    if (utilidadPorPorcentaje > utilidadMinima) {
        var precioUnitario = precioUnitarioPorcentaje
    } else {
        var precioUnitario = (costoTotal + impuestoEstimado + utilidadMinima)/cantidad
    }
    return precioUnitario 
}

