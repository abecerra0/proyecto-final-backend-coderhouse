const socket = io();
//instancia del lado del cliente
//console.log("Funcionando");

//Recibimos el array de usuarios:
socket.on("products", (arrayProducts) => {
  renderProducts(arrayProducts);
});

function renderProducts(products) {
  const productsHtml = products
    .map(
      (product, index) => `
      <div>
        <p> ${product.title} </p>
        <p> ${product.description} </p>
        <p> ${product.price} </p>
        <img src="${product.img}" alt="${product.title}" />
        <p> ${product.code} </p>
        <p> ${product.stock} </p>
        <button onclick="eliminarProducto(${product.id})">Eliminar</button>
      </div>
      `
    )
    .join(" ");

  document.getElementsByClassName("contenedorCards")[0].innerHTML =
    productsHtml;
}

function agregarProducto(e) {
  const product = {
    title: document.getElementById("producto").value,
    description: document.getElementById("descripcion").value,
    price: document.getElementById("precio").value,
    img: document.getElementById("imagen").value,
    code: document.getElementById("codigo").value,
    stock: document.getElementById("stock").value,
  };

  socket.emit("productoNuevo", product);
  return false;
}

function eliminarProducto(idProducto) {
  socket.emit("eliminarProducto", idProducto);
}
