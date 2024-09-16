const productos = {
    bebidas: [
        { id: 'b1', nombre: "Agua aromática de manzanilla", precio: 2000 },
        { id: 'b2', nombre: "Agua aromática de hierbabuena", precio: 2000 },
        { id: 'b3', nombre: "Tinto", precio: 1500 },
        { id: 'b4', nombre: "Café con leche", precio: 2500 }
    ],
    comestibles: [
        { id: 'c1', nombre: "Empanada de carne", precio: 2500 },
        { id: 'c2', nombre: "Empanada de pollo", precio: 2500 },
        { id: 'c3', nombre: "Empanada de queso", precio: 2300 },
        { id: 'c4', nombre: "Empanada mixta", precio: 2700 },
        { id: 'c5', nombre: "Pastel de pollo", precio: 3000 },
        { id: 'c6', nombre: "Palitos de queso", precio: 2000 }
    ],
    confiteria: [
        { id: 'f1', nombre: "Torta de chocolate", precio: 3500 },
        { id: 'f2', nombre: "Cheesecake", precio: 4000 },
        { id: 'f3', nombre: "Galletas de avena", precio: 1000 },
        { id: 'f4', nombre: "Brownie", precio: 2500 },
        { id: 'f5', nombre: "Muffin de arándanos", precio: 2000 }
    ]
};

let carrito = [];

function mostrarProductos(categoria, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    productos[categoria].forEach(producto => {
        const item = document.createElement("div");
        item.className = "menu-item";
        item.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
        `;
        contenedor.appendChild(item);
    });
}

function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
    mostrarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('items-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    listaCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });
    
    totalCarrito.textContent = total;
    updateCartCount();
}

function mostrarCarrito() {
    document.getElementById('carrito').classList.add('visible');
    document.getElementById('overlay').classList.add('visible');
}

function ocultarCarrito() {
    document.getElementById('carrito').classList.remove('visible');
    document.getElementById('overlay').classList.remove('visible');
}

function toggleNav() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

function toggleCart() {
    const cart = document.getElementById('carrito');
    const overlay = document.getElementById('overlay');
    cart.classList.toggle('visible');
    overlay.classList.toggle('visible');
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos("bebidas", "menu-bebidas");
    mostrarProductos("comestibles", "menu-comestibles");
    mostrarProductos("confiteria", "menu-confiteria");

    const toggleCartBtn = document.getElementById('toggle-cart');
    toggleCartBtn.addEventListener('click', toggleCart);

    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', toggleCart);

    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
    });

    // Actualizar el contador del carrito cada vez que se modifica
    const observer = new MutationObserver(updateCartCount);
    observer.observe(document.getElementById('items-carrito'), { childList: true, subtree: true });
});

// Cerrar carrito al hacer clic fuera de él
document.addEventListener('click', (e) => {
    const carrito = document.getElementById('carrito');
    if (!carrito.contains(e.target) && !e.target.closest('button')) {
        ocultarCarrito();
    }
});