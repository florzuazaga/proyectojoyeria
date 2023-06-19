const product = document.getElementById("conteinerproductos");
const verCarrito = document.getElementById("vercarrito");
const modalCarrito = document.getElementById("modal-carrito");
const productos = [
  {
    id: "alianza",
    titulo: "Alianza ",
    imagen: "./img/alianza.jpg",
    categoria: {
      nombre: "Alianza",
      id: "alianza",
    },
    cantidad: 1,
    precio: 95258,
  },
  {
    id: "reloj",
    titulo: "Reloj",
    imagen: "./img/reloj.png",
    categoria: {
      nombre: "Reloj",
      id: "reloj",
    },
    cantidad: 1,
    precio: 32000,
  },
  {
    id: "abridores",
    titulo: "Abridores de oro 18kts",
    imagen: "./img/abridores.jpg",
    categoria: {
      nombre: "Abridores",
      id: "abridores",
    },
    cantidad: 1,
    precio: 28270,
  },
  {
    id: "dije",
    titulo: "Dije de oro 18kts",
    imagen: "./img/dije.jpg",
    categoria: {
      nombre: "Dije",
      id: "dije",
    },
    cantidad: 1,
    precio: 46233,
  },
  {
    id: "cadena",
    titulo: "Cadena de plata 925",
    imagen: "./img/cadena.jpg",
    categoria: {
      nombre: "Cadena",
      id: "cadena",
    },
    cantidad: 1,
    precio: 4670,
  },
  {
    id: "anillo",
    titulo: "Anillo de oro 18kts con topacio sintético central",
    imagen: "./img/anillo.webp",
    categoria: {
      nombre: "Anillo",
      id: "anillo",
    },
    cantidad: 1,
    precio: 105075,
  },
  {
    id: "aros",
    titulo: "Aros de oro ammarillo y blanco 18kts combinados",
    imagen: "./img/aros.jpg",
    categoria: {
      nombre: "Aros",
      id: "aros",
    },
    cantidad: 1,
    precio: 168120,
  },
  {
    id: "pulsera",
    titulo: "Pulsera de oro 18kts-tipo gucci",
    imagen: "./img/pulsera.jpg",
    categoria: {
      nombre: "pulsera",
      id: "pulsera",
    },
    cantidad: 1,
    precio: 542187,
  },
];
let carrito = [];
const conteinerProductos = document.querySelector("#conteinerproductos");
function cargarCarrito(productos) {
  conteinerProductos.innerHTML = "";
  productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "conteiner";
    content.innerHTML = `
      <img class="producto-imagen"src="${producto.imagen}" alt="${producto.titulo}">
    <div class="producto-detalles">
      <h3 class="producto-titulo">${producto.titulo}</h3>
      <p class="producto-precio">$${producto.precio}</p>
      <p>cantidad: ${producto.cantidad}</p>
  `;
    product.append(content);

    let agregar = document.createElement("button");
    agregar.innerText = "agregar";
    agregar.className = "botonagregar";

    content.append(agregar);

    agregar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProducto) => repeatProducto.id === producto.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === producto.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: producto.id,
          img: producto.imagen,
          titulo: producto.titulo,
          precio: producto.precio,
          cantidad: producto.cantidad,
        });
      }
    });
  });
}
const tituloProducto = document.querySelector("#tituloproducto");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloProducto.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarCarrito(productosBoton);
    } else {
      tituloProducto.innerText = "Todos los productos";
      cargarCarrito(productos);
    }
  });
});
const vermicarrito = () => {
  modalCarrito.innerHTML = ``;
  modalCarrito.style.display = "flex";
  const modalprincipio = document.createElement("div");
  modalprincipio.className = "modal-principio";
  modalprincipio.innerHTML = `
  <h1 class="modal-principio-bienvenida">Bienvenido a tu compra</h1>
  `;
  modalCarrito.append(modalprincipio);

  const modalbutton = document.createElement("h2");
  modalbutton.innerText = "Cerrar";
  modalbutton.className = "modal-principio-button";
  modalprincipio.append(modalbutton);
  modalbutton.addEventListener("click", () => {
    modalCarrito.style.display = "none";
  });

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-contenido";
    carritoContent.innerHTML = `
      <h3 >${producto.titulo}</h3>
      <p>$${producto.precio}</p>
      <p>${producto.cantidad}</p>
      <p>${producto.cantidad * producto.precio}</p>
    `;
    modalCarrito.append(carritoContent);
    let eliminar = document.createElement("span");
    eliminar.innerText = "⚔";
    eliminar.className = "eliminar-producto";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarAgregado);
  });
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalcomprar = document.createElement("div");
  totalcomprar.className = "totalproductos";
  totalcomprar.innerHTML = `total a abonar:${total}`;
  modalCarrito.append(totalcomprar);
};
verCarrito.addEventListener("click", vermicarrito);
const eliminarAgregado = () => {
  const foundId = carrito.find((Element) => Element.id);
  carrito = carrito.filter((compraId) => {
    return compraId !== foundId;
  });
  vermicarrito();
};
