document.addEventListener("DOMContentLoaded", function () {
    let carrito = [];

    function actualizarCarrito() {
        let contenidoCarrito = document.getElementById("contenidoCarrito");
        let totalCarrito = document.getElementById("totalCarrito");
        let contadorCarrito = document.getElementById("contadorCarrito");

        contenidoCarrito.innerHTML = "";
        let total = 0;
        let totalProductos = 0;

        carrito.forEach((item, index) => {
            let div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            div.style.padding = "5px";
            div.style.borderBottom = "1px solid #ddd";

            let nombreProducto = document.createElement("span");
            nombreProducto.textContent = `${item.nombre} (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}`;

            let btnEliminar = document.createElement("button");
            btnEliminar.textContent = "✖";
            btnEliminar.style.background = "#e74c3c";  // Rojo más elegante
            btnEliminar.style.color = "white";
            btnEliminar.style.border = "none";
            btnEliminar.style.padding = "3px 6px";  // 🔹 Botón más pequeño
            btnEliminar.style.fontSize = "12px";  // 🔹 Letra más pequeña
            btnEliminar.style.borderRadius = "5px";  // 🔹 Bordes redondeados
            btnEliminar.style.cursor = "pointer";
            btnEliminar.onclick = function () {
                eliminarDelCarrito(index);
            };

            div.appendChild(nombreProducto);
            div.appendChild(btnEliminar);
            contenidoCarrito.appendChild(div);

            total += item.precio * item.cantidad;
            totalProductos += item.cantidad;
        });

        totalCarrito.innerText = `S/ ${total.toFixed(2)}`;
        contadorCarrito.innerText = totalProductos;
    }

    window.agregarAlCarrito = function (id) {
        let productos = [
            { id: 1, nombre: "Producto 1", precio: 20 },
            { id: 2, nombre: "Producto 2", precio: 35 },
            { id: 3, nombre: "Producto 3", precio: 50 },
        ];

        let producto = productos.find(p => p.id === id);
        let itemEnCarrito = carrito.find(p => p.id === producto.id);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarCarrito();

        Swal.fire({
            title: "Producto agregado",
            text: `${producto.nombre} ha sido agregado al carrito.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    };

    window.eliminarDelCarrito = function (index) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    };
});

