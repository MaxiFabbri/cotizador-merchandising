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

let cartProducts
let cartProductsLS = localStorage.getItem("cartProducts")
if(cartProductsLS){
    cartProducts = JSON.parse(cartProductsLS)
} else {
    cartProducts = []
}

let productsContainer = document.getElementById("products-container")

function renderProducto(productsArray) {
    productsArray.forEach (producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    })
    addToCartButton ()
}
renderProducto(productos)

function addToCartButton () {
    let addbutton = document.querySelectorAll(".productoAgregar")
    addbutton.forEach (button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find (producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}