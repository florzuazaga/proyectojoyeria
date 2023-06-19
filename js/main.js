const product = document.getElementById("conteinerproductos");
const verCarrito = document.getElementById("vercarrito");
const modalCarrito = document.getElementById("modal-carrito");
const conteinerProductos = document.querySelector("#conteinerproductos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const getProducto = async () => {
  const respuesta = await fetch("./productos.json");
  const datos = await respuesta.json();
  datos.forEach((producto) => {
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
        savelocal();
      }
    });
  });
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
};
getProducto();

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
      <span id="restar"> - </span>
      <p>${producto.cantidad}</p>
      <span id="sumar"> + </span>
      <p>${producto.cantidad * producto.precio}</p>
    `;
    modalCarrito.append(carritoContent);
    let restar = carritoContent.querySelector("#restar");
    restar.addEventListener("click", () => {
      if (producto.cantidad !== 1) {
        producto.cantidad--;
      }
      vermicarrito();
    });
    let sumar = carritoContent.querySelector("#sumar");
    sumar.addEventListener("click", () => {
      if (producto.cantidad !== 1) {
        producto.cantidad++;
      }
      vermicarrito();
    });

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
  savelocal();
  vermicarrito();
};
const savelocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
