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
        nuevaCotizacion(cotizEl.fecha, cotizEl.cambioUsado, cotizEl.cliente, cotizEl.proveedor, cotizEl.producto,
             cotizEl.logo, cotizEl.cantidad, cotizEl.costoUnitario, cotizEl.costoFijo, cotizEl.otrosCostos, cotizEl.precioUnitario);
        agregarCotizATabla(cotizEl);
    });
} else {
    cotizaciones = []
}

const cotiCopia = cotizaciones.map((cotiz) => cotiz);
filtrarDatos();

// Controlo como cambian los textos de buscar
let buscar = document.getElementById("inBuscar")
buscar.onkeyup = () => { 
    mostrarCotizaciones.innerHTML = "";
    filtrarDatos(buscar.value.toLowerCase())
}

function filtrarDatos (texto) {
    const cotiBuscar = cotiCopia.filter(clave =>
        clave.cliente.toLowerCase().includes(texto) ||
        clave.proveedor.toLowerCase().includes(texto) ||
        clave.producto.toLowerCase().includes(texto) ||
        clave.logo.toLowerCase().includes(texto) ||
        clave.fecha.toLowerCase().includes(texto)
    );
    cotiBuscar.forEach((cotizacion) => {
        agregarCotizATabla(cotizacion)
    })    
}
