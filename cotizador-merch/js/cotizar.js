// Busco la tabla de datos en un archivo json
fetch("../db/data.json")
.then(response => response.json())
.then(data => {
    escalasUtilidades = data;
})
// Muestro el valor del Dolar Vigente y la Fecha
document.getElementById("tipoCambio").innerText = cambioDolar.cambio.toFixed(2);
document.getElementById("fechaCambio").innerText = cambioDolar.fecha;

// Creo el evento sobre el boton cotizar
let cotizar = document.getElementById("botonCotizar");
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
    });
} else {
    cotizaciones = []
}

// Input de Datos por HTML
function inputDatos() {
    let cambioUsado = cambioDolar.cambio;
    let fecha = fechaCorta(hoy);
    let cliente = (document.getElementById("inCliente")).value;
    let proveedor = (document.getElementById("inProveedor")).value;
    let producto = (document.getElementById("inProducto")).value;
    let logo = (document.getElementById("inLogo")).value;
    let cantidad = (document.getElementById("inCantidad")).value;
    let costoUnitario = ((document.getElementById("inCostoUnitario")).value/cambioUsado);
    let costoFijo = ((document.getElementById("inCostoFijo")).value/cambioUsado);
    let otrosCostos = ((document.getElementById("inOtrosCostos")).value/cambioUsado);
    // Valido que los datos sean positivos
    if(cantidad>0 && costoUnitario>0 && costoFijo>=0 && otrosCostos>=0) {
        // llamo a la funcion que Calcula el precio calculoPrecio
        let precioUnitario = calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos);

        // Muestro el precio en la Web
        document.getElementById("outPrecioUnitario").innerText = (precioUnitario*cambioUsado).toFixed(2);
        nuevaCotizacion (fecha, cambioUsado, cliente, proveedor, producto, logo, cantidad, costoUnitario, costoFijo, otrosCostos, precioUnitario);
        
        // Muestro un alerta con el precio y la opción de regresar o hacer otra cotización
        mostrarSwalExito(precioUnitario, cambioUsado);
        
        const cotizacionesEnJson = JSON.stringify(cotizaciones);
        localStorage.setItem('cotizaciones',cotizacionesEnJson);
    } else {
        mostrarSwalFallo();
        if(cantidad<=0){
            document.getElementById("inCantidad").classList.add("error");
        } else {
            document.getElementById("inCantidad").classList.remove("error");
        }
        if(costoUnitario<=0){
            document.getElementById("inCostoUnitario").classList.add("error");
        } else {
            document.getElementById("inCostoUnitario").classList.remove("error");
        }
        if(costoFijo<0){
            document.getElementById("inCostoFijo").classList.add("error");
        } else {
            document.getElementById("inCostoFijo").classList.remove("error");
        }
        if(otrosCostos<0){
            document.getElementById("inOtrosCostos").classList.add("error");
        } else {
            document.getElementById("inOtrosCostos").classList.remove("error");
        }  
    }
    
}
// Función para mostrar el SweetAlert y redirigir
function mostrarSwalExito(precioUni, cambio) {
    Swal.fire({
        title: "Cotización Realizada, Precio de Venta $ "+(precioUni*cambio).toFixed(2),
        text: "Desea realizar otra cotización?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: "No, Muchas Gracias",
        confirmButtonText: 'Sí, seguir cotizando'
    }).then((result) => {
        if (result.isDismissed) {
            window.location.href = '../index.html';
        }
    });
  }
  function mostrarSwalFallo() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alguno de los datos cargados es incorrecto"
      });
  }

// Funcion que calcula el precio en base a los datos
function calculoPrecio(cantidad, costoUnitario, costoFijo, otrosCostos){
   // calculo el costo Neto y Total
   let costoNeto = ((cantidad*costoUnitario)+costoFijo);
   let costoTotal = (costoNeto+otrosCostos);
   // Busco en la tabla de escalas de Utilidad, la correspondiente a este costo Neto
   const utilidadDeseada = escalasUtilidades.find(escala => costoNeto < escala.hasta);
   let porcentajeUtilidad = parseInt(utilidadDeseada.utilidad);
   let utilidadMinima = parseInt(utilidadDeseada.minimo);
   // calculo el precio Unitario Probable por rentabilidad de %
   let precioUnitarioPorcentaje = (costoTotal/(1-((porcentajeUtilidad+impuestos)/100)))/cantidad; 
   // Calculo impuesto Estimado por la rentabilidad de %
   let impuestoEstimado = ((precioUnitarioPorcentaje*cantidad)*(impuestos/100));
   // calculo la utilidad con el precio Unitario Probable por rentabilidad de % contra la utilidad minima y defino la utilidad
   let utilidadPorPorcentaje = ((precioUnitarioPorcentaje*cantidad)-costoTotal-impuestoEstimado);
   if (utilidadPorPorcentaje > utilidadMinima) {
       var precioUnitario = precioUnitarioPorcentaje;
   } else {
       var precioUnitario = (costoTotal + impuestoEstimado + utilidadMinima)/cantidad;
   }
   return precioUnitario;
}
