// Creo el evento sobre el boton cotizar
let cotizar = document.getElementById("botonCotizar")
cotizar.onclick = () => { 
    inputDatos();
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

    const cotizacionesEnJson = JSON.stringify(cotizaciones)
    localStorage.setItem('cotizaciones',cotizacionesEnJson)
}

