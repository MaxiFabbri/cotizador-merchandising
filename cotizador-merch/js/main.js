const impuestos = 5
// probe sin el parse pero me hacía algunos calculos mal
const cambioDolar = parseFloat(365)

let ingresaPedido = prompt('Desea ingrsar una cotización: Si / No')

while (ingresaPedido.toLowerCase() == "si") {
    ingresoDeDatos()
    // tengo que sumarlo al array de cotizaciones realizadas en proximas versiones

    ingresaPedido = prompt('Desea ingrsar otra cotización: Si / No')
}

function ingresoDeDatos () {
    // Le pido al usuario los datos para el calculo del precio y los paso a Dolares
    let cantidad = parseInt(prompt('Cantidad:'))
    let costoUnitario = (parseInt(prompt('Costo Unitario:'))/cambioDolar)
    let costoFijo = (parseInt(prompt('Costo Fijo:'))/cambioDolar)
    let otrosCostos = (parseInt(prompt('Otros Costos:'))/cambioDolar)
    calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos)
}

function calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos){
    // calculo el costo Neto y Total
    let costoNeto = ((cantidad*costoUnitario)+costoFijo)
    let costoTotal = (costoNeto+otrosCostos)
    
    // llamo a la funcion que calcula la utilidad deseada, dependiendo del importe total
    // const utilidadDeseada = calculaUtilidadDeseada(cantidad , costoUnitario , costoFijo )
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



