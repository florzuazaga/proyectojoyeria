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
  <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
  <div class="producto-detalles">
      <h3 class="producto-titulo">${producto.titulo}</h3>
      <p class="producto-precio">$${producto.precio}</p>
  </div>
  `;
    product.append(content);
    let agregar = document.createElement("button");
    agregar.innerText = "agregar";
    agregar.className = "botonagregar";

    content.append(agregar);

    agregar.addEventListener("click", () => {
      carrito.push({
        id: producto.id,
        img: producto.imagen,
        titulo: producto.titulo,
        precio: producto.precio,
      });
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
verCarrito.addEventListener("click", () => {
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
    <img src="${producto.imagen}">
      <h3 >${producto.titulo}</h3>
      <p c>$${producto.precio}</p>
    `;
    modalCarrito.append(carritoContent);
  });
  const total = carrito.reduce((acc, el) => acc + el.precio, 0);
  const totalcomprar = document.createElement("div");
  totalcomprar.className = "totalproductos";
  totalcomprar.innerHTML = `total a abonar:${total}`;
  modalCarrito.append(totalcomprar);
});
