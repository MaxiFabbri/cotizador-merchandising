const impuestos = 5
const cambioDolar = parseFloat(868.5)
const Cotizaciones = []

class Cotizacion {
    static id = 0
    constructor (cliente, proveedor, producto, logo, cantidad, costoFijo, otrosCostos, precioUnitario) {
        this.id = ++Cotizacion.id
        this.cliente = cliente,
        this.proveedor = proveedor,
        this.producto = producto,
        this.logo = logo,
        this.cantidad = cantidad,
        this.costoFijo = costoFijo,
        this.otrosCostos = otrosCostos,
        this.precioUnitario = precioUnitario
    }
}

// Menu de inicio
let menu = parseInt(prompt("Bienvenido! Elija:\n\n1 Para ver las cotizaciones,\n2 Para cargar una nueva cotización,\n3 Para salir"))

while(menu !==3){
    switch (menu) {
        case 1:
            verCotizaciones()
            break
        case 2:
            ingresoDeDatos()
            break 
        default:
            alert("Opcion incorrecta")
            break
    }
    menu = parseInt(prompt("Bienvenido! Elija:\n\n1 Para ver las cotizaciones,\n2 Para cargar una nueva cotización,\n3 Para salir"))
}


function ingresoDeDatos () {
    // Le pido al usuario los datos para el calculo del precio y los paso a Dolares
    let cliente = prompt('Ingrese Cliente:')
    let proveedor = prompt('Ingrese Proveedor:')
    let producto = prompt('Ingrese Producto:')
    let logo = prompt('Ingrese Logo:')
    let cantidad = parseInt(prompt('Cantidad:'))
    let costoUnitario = (parseFloat(prompt('Costo Unitario:'))/cambioDolar)
    let costoFijo = (parseFloat(prompt('Costo Fijo:'))/cambioDolar)
    let otrosCostos = (parseFloat(prompt('Otros Costos:'))/cambioDolar)
    let precioUnitario = calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos)

    console.log('Final - El precio unitario de venta es: '+(precioUnitario*cambioDolar).toFixed(1)+' y el precio total es: '+ (precioUnitario*cambioDolar*cantidad).toFixed(2))

    // Creo una nueva cotización y la cargo en un array
    const cotizacion = new Cotizacion(cliente, proveedor, producto, logo, cantidad, costoFijo, otrosCostos, precioUnitario)
    console.log(cotizacion)
    Cotizaciones.push(cotizacion)
}



function calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos){
    // calculo el costo Neto y Total
    let costoNeto = ((cantidad*costoUnitario)+costoFijo)
    let costoTotal = (costoNeto+otrosCostos)
    
    // llamo a la funcion que calcula la utilidad deseada, dependiendo del importe total
    const utilidadDeseada = calculaUtilidadDeseada(costoNeto)
    let porcentajeUtilidad = parseInt(utilidadDeseada.porcentajeUti)
    let utilidadMinima = parseInt(utilidadDeseada.utilidadMin)

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
    console.log('El precio unitario de venta es: '+(precioUnitario*cambioDolar).toFixed(1)+' y el precio total es: '+ (precioUnitario*cambioDolar*cantidad).toFixed(2))
    return precioUnitario   
}



// defino la funcion que calcula la utilidad deseada
function calculaUtilidadDeseada (netCost) {    
    // defino la tabla utilidades segun el costo total
    const escalasUtilidades = [
        {hasta: 408, utilidad: 30 , minimo: 82},
        {hasta: 1429, utilidad: 28 , minimo: 188},
        {hasta: 2041, utilidad: 25 , minimo: 597},
        {hasta: 4082, utilidad: 22 , minimo: 729},
        {hasta: 9999999999, utilidad: 20 , minimo: 1230}
    ]
    // busco en la tabla la escala segun el costo total
    for (const itemUtilidad of escalasUtilidades){
        if (netCost<itemUtilidad.hasta){
            let utilidadDeseada = {porcentajeUti: itemUtilidad.utilidad, utilidadMin: itemUtilidad.minimo}
            return utilidadDeseada
        } 
    }
}

// funcion para ver las cotizaciones ya realizadas
function verCotizaciones () {
    if (Cotizaciones.length === 0) {
        console.log("No hay cotizaciones realizadas")
    } else {
        for (const cotizacion of Cotizaciones) {
            console.log(cotizacion)
        }
    }
}

