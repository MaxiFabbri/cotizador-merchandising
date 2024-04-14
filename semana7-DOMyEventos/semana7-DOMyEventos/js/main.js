const productos= [
    {
        id: 1, 
        nombre: "Televisor", 
        precio: 5000
    },
    {
        id: 2, 
        nombre: "Lavarropas", 
        precio: 8000
    },
    {
        id: 3, 
        nombre: "Microondas", 
        precio: 2000
    },
    {
        id: 4, 
        nombre: "Secadora", 
        precio: 4000
    },
    {
        id: 5, 
        nombre: "Cocina", 
        precio: 13000
    },
]


//getElementById
// let titulo = document.getElementById("title")
// console.log(titulo)
// let titleContainer = document.getElementById("title-container")
// console.log(titleContainer)

//getElementsByClassName
// let pastas = document.getElementsByClassName("pasta")
// console.log(pastas)
// console.log(pastas[0].innerHTML)
// console.log(pastas[1].innerHTML)
// console.log(pastas[2].innerHTML)
// for (const pasta of pastas) {
//     console.log(pasta.innerHTML)
// }

//getElementsByTagName
// let articulos = document.getElementsByTagName("article")
// console.log(articulos)
// console.log(articulos[0].innerHTML)
// console.log(articulos[1].innerHTML)
// for (const articulo of articulos) {
//     console.log(articulo.innerHTML)
// }

//innerText
// titulo.innerText = "Hola Coder!!"

//innerHTML
// let contenedor = document.getElementById("container")
// contenedor.innerHTML = "<h2> Hola comision <span>60465</span></h2>"
// contenedor.className = "header"

//append
// let subtitulo = document.createElement("h2")
// subtitulo.innerHTML = "<span>Aguante la pizza!</span>"
// document.body.appendChild(subtitulo)

//remove
// titulo.remove()
// pastas[0].remove()


// let zapatillas = ["nike", "adidas", "vans", "converse"]
// let marcas = document.getElementById("marcas")
// for (const zapatilla of zapatillas) {
//     let li = document.createElement("li")
//     li.innerHTML = zapatilla
//     marcas.appendChild(li)
// }

// let products = document.getElementById("productos")

// productos.forEach ((producto) => {
//     let contenedor = document.createElement("div")
//     contenedor.className = "card"
//     contenedor.innerHTML = `<span>ID: ${producto.id}</span>
//                             <h3>Producto: ${producto.nombre}</h3>
//                             <h4>Precio: $${producto.precio}</h4>`
//     products.appendChild(contenedor)
// })

// let evento = document.getElementById("h1")

// evento.addEventListener("click", clickTest)
// function clickTest () {
//     console.log("Test de click")
// }

// let clicks = 0
// evento.onclick = () => {
//     clicks ++
//     console.log("Cantidad de clicks: ",clicks)
// }

// let input = document.getElementById("input")
// input.onkeyup = () => {
//     console.log("apretaste una tecla")
// }

// let counter = document.getElementById("counter")
// let sumar = document.getElementById("plus-button")
// let restar = document.getElementById("minus-button")
// let contador = 0

// sumar.onclick = () => {
//     contador ++
//     counter.innerHTML = contador
//     restar.disabled = false
// }

// restar.onclick = () => {
//     if (contador === 0) {
//         restar.disabled = true
//     } else {
//         contador --
//         counter.innerHTML = contador
//     }
// }


//ACA ARRANCA LO PENDIENTE DE LA CLASE!!!

//Evento change, detecta el cambio en un elemento. En el ejemplo el evento se ejecuta al sacarle el foco al input (se realiza la busqueda y se muestra el resultado por consola)

const cervezas = ["rubia", "negra", "roja", "ipa", "apa"]
let input = document.getElementById("search")
input.onchange = () => {
    const element = cervezas.find ((cerveza) => cerveza === input.value) //con input.value se captura lo que se escribio dentro del input
    console.log(element)
}

//Calcular cuotas a partir de un form con un select. Los value dentro de los option es el valor de cada uno

let calcular = document.getElementById("calcular")
let cuotas = document.getElementById("cuotas")
let precio = document.getElementById("precio")

calcular.onclick = () => {
    let precioFinal = precio.value/cuotas.value //dividimos el precio ingresado en el input por las cuotas (value 6 o 12)

    let print = document.createElement("h3")
    print.innerHTML = `Son ${cuotas.value} cuotas de $${precioFinal}`
    document.body.appendChild(print) //imprmimos resultado como hijo del body
}