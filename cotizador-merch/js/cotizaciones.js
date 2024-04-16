const cotiCopia = cotizaciones.map((cotiz) => cotiz);
filtrarDatos();


// Controlo como cambian los textos de buscar
let buscar = document.getElementById("inBuscar")
buscar.onkeyup = () => { 
    mostrarCotizaciones.innerHTML = "";
    // filtrarDatos(buscar.value)
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
