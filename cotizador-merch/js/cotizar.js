// Busco la tabla de datos en un archivo json
fetch("../db/data.json")
.then(response => response.json())
.then(data => {
    escalasUtilidades = data;
})

// Creo el evento sobre el boton cotizar
let cotizar = document.getElementById("botonCotizar")
cotizar.onclick = () => { 
    inputDatos();
}
// Reviso el Local Storage y recupero los datos de cotizaciones y los pongo en el Array Cotizaciones
let cotizacionesLS = localStorage.getItem('cotizaciones')
if (cotizacionesLS) {
    let cotizacionesProv =[]
    cotizacionesProv = JSON.parse(cotizacionesLS)
    cotizacionesProv.forEach(cotizEl => {
        nuevaCotizacion(cotizEl.fecha, cotizEl.cambioUsado, cotizEl.cliente, cotizEl.proveedor, cotizEl.producto,
             cotizEl.logo, cotizEl.cantidad, cotizEl.costoUnitario, cotizEl.costoFijo, cotizEl.otrosCostos, cotizEl.precioUnitario);
        // agregarCotizATabla(cotizEl);
    });
} else {
    cotizaciones = []
}

// Input de Datos por HTML
function inputDatos() {
    let cambioUsado = cambioDolar
    let fecha = fechaCorta(hoy)
    let cliente = (document.getElementById("inCliente")).value
    let proveedor = (document.getElementById("inProveedor")).value
    let producto = (document.getElementById("inProducto")).value
    let logo = (document.getElementById("inLogo")).value
    let cantidad = (document.getElementById("inCantidad")).value
    let costoUnitario = ((document.getElementById("inCostoUnitario")).value/cambioUsado)
    let costoFijo = ((document.getElementById("inCostoFijo")).value/cambioUsado)
    let otrosCostos = ((document.getElementById("inOtrosCostos")).value/cambioUsado)
    
    // llamo a la funcion que Calcula el precio calculoPrecio
    let precioUnitario = calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos)

    // Muestro el precio en la Web
    document.getElementById("outPrecioUnitario").innerText = (precioUnitario*cambioUsado).toFixed(2)
    nuevaCotizacion (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo, otrosCostos, precioUnitario)
    

    Swal.fire({
        title: "Cotización Realizada",
        text: "Precio de Venta $ "+(precioUnitario*cambioUsado).toFixed(2),
        icon: "success"
      });
    const cotizacionesEnJson = JSON.stringify(cotizaciones)
    localStorage.setItem('cotizaciones',cotizacionesEnJson)
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
