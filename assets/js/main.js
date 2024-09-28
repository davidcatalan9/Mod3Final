function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

function Carrito() {
    this.productos = [];
}

Carrito.prototype.agregarProducto = function (producto, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        this.productos.push(producto);
    }
};

Carrito.prototype.calcularTotal = function () {
    return this.productos.reduce(function (total, producto) {
        return total + producto.precio;
    }, 0);
};

Carrito.prototype.finalizarCompra = function () {
    const total = this.calcularTotal();
    alert('Compra Finalizada. Total a Pagar: $' + total);
    this.productos = [];
    this.mostrarCarrito();
};

Carrito.prototype.mostrarCarrito = function () {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('total');

    listaCarrito.innerHTML = '';
    this.productos.forEach(function (producto, index) {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = 'Total: $' + this.calcularTotal();
};

const productosDisponibles = [
    new Producto('Manzanas', 1200),
    new Producto('Pan', 1800),
    new Producto('Leche', 950),
];

const carrito = new Carrito();

function mostrarProductos() {
    const ListaProductos = document.getElementById('lista-productos');
    const selectProducto = document.getElementById('producto');

    productosDisponibles.forEach(function (producto, index) {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        ListaProductos?.appendChild(li);

        const option = document.createElement('option');
        option.value = index;
        option.textContent = producto.nombre;
        selectProducto?.appendChild(option);
    });
}

function agregarProductoAlCarrito() {
    const productoSeleccionado = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (productoSeleccionado !== '' && cantidad > 0) {
        const producto = productosDisponibles[productoSeleccionado];
        carrito.agregarProducto(producto, cantidad);
        carrito.mostrarCarrito();
    } else {
        alert('Por favor selecciona un producto y una cantidad válida.');
    }
}

function finalizarCompra() {
    if (carrito.productos.length > 0) {
        carrito.finalizarCompra();
    } else {
        alert('El carrito está vacío.');
    }
}

document.getElementById('agregar')?.addEventListener('click', agregarProductoAlCarrito);
document.getElementById('finalizarCompra')?.addEventListener('click', finalizarCompra);

mostrarProductos();
