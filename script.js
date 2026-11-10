
// ======================================
// AGROCUMARAL - FUNCIONES PRINCIPALES
// ======================================

// Recuperar información guardada
let productores = JSON.parse(
    localStorage.getItem("productores")
) || [];

let productos = JSON.parse(
    localStorage.getItem("productos")
) || [];

// Elementos de la aplicación
const formularioProductor =
    document.getElementById("formProductor");

const formularioProducto =
    document.getElementById("formProducto");

// ======================================
// REGISTRO DE PRODUCTORES
// ======================================

formularioProductor.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreProductor").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const contacto = document.getElementById("contacto").value.trim();

    if (!nombre || !ubicacion || !contacto) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const productor = {
        nombre: nombre,
        ubicacion: ubicacion,
        contacto: contacto
    };

    productores.push(productor);

    localStorage.setItem(
        "productores",
        JSON.stringify(productores)
    );

    document.getElementById("mensajeProductor").textContent =
        "¡Productor registrado correctamente!";

    formularioProductor.reset();
    mostrarProductores();
});
// MOSTRAR PRODUCTORES REGISTRADOS

function mostrarProductores() {

    const lista = document.getElementById("listaProductores");

    if (!lista) return;

    lista.innerHTML = "";

    if (productores.length === 0) {
        lista.textContent = "No hay productores registrados.";
        return;
    }

   productores.forEach(function(productor, indice) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";

        const nombre = document.createElement("h3");
        nombre.textContent = productor.nombre;

        const ubicacion = document.createElement("p");
        ubicacion.textContent = "Ubicación: " + productor.ubicacion;

        const contacto = document.createElement("p");
        contacto.textContent = "Contacto: " + productor.contacto;

        tarjeta.appendChild(nombre);
        tarjeta.appendChild(ubicacion);
        tarjeta.appendChild(contacto);
        
const botonEliminar = document.createElement("button");
botonEliminar.textContent = "Eliminar productor";
botonEliminar.type = "button";

botonEliminar.addEventListener("click", function() {
    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este productor?"
    );

    if (confirmar) {
        productores.splice(indice, 1);

        localStorage.setItem(
            "productores",
            JSON.stringify(productores)
        );

        mostrarProductores();
    }
});

tarjeta.appendChild(botonEliminar);


        lista.appendChild(tarjeta);

    });
}

// Mostrar productores al cargar la página
mostrarProductores();

// ======================================
// PUBLICACION DE PRODUCTOS
// ======================================

formularioProducto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreProducto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const cantidad = Number(document.getElementById("cantidad").value);
    const precio = Number(document.getElementById("precio").value);
    const fechaCosecha = document.getElementById("fechaCosecha").value;


    if (!nombre || !categoria || cantidad <= 0 || precio <= 0) {
        alert("Por favor ingresa datos válidos.");
        return;
    }

    
const producto = {
    nombre: nombre,
    categoria: categoria,
    cantidad: cantidad,
    precio: precio,
    fechaCosecha: fechaCosecha
};


    productos.push(producto);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    document.getElementById("mensajePublicacion").textContent =
        "¡Producto publicado correctamente!";

    formularioProducto.reset();

    mostrarProductos();
});

// ======================================
// MOSTRAR CATALOGO AGRICOLA
// ======================================

function mostrarProductos() {

    const lista = document.getElementById("listaProductos");

    lista.innerHTML = "";

    if (productos.length === 0) {
        lista.textContent = "Aún no hay productos publicados.";
        return;
    }

  productos.forEach(function(producto, indice) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        

const imagen = document.createElement("img");

const nombreProducto = producto.nombre.toLowerCase();

if (nombreProducto.includes("plátano") || nombreProducto.includes("platano")) {
    imagen.src = "imagenes/platano.jfif";
else if (nombreProducto.includes("naranja")) {
    imagen.src = "imagenes/naranja.jfif";
}
}

imagen.alt = "Fotografía de " + producto.nombre;
imagen.className = "imagen-producto";

if (imagen.getAttribute("src")) {
    tarjeta.appendChild(imagen);
}


if (imagen.src && producto.nombre.toLowerCase().includes("plátano")) {
    tarjeta.appendChild(imagen);
}


        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoría: " + producto.categoria;

        const cantidad = document.createElement("p");
        cantidad.textContent = "Cantidad: " + producto.cantidad + " kg";

        const precio = document.createElement("p");
        precio.textContent = "Precio: $" +
            producto.precio.toLocaleString("es-CO") + " COP/kg";
            
const fecha = document.createElement("p");

fecha.textContent = "Fecha de cosecha: " +
    (producto.fechaCosecha || "No registrada");


        tarjeta.appendChild(titulo);
        tarjeta.appendChild(categoria);
        tarjeta.appendChild(cantidad);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(fecha);
        
const botonFicha = document.createElement("button");
botonFicha.type = "button";
botonFicha.textContent = "Ver ficha digital";

botonFicha.addEventListener("click", function() {
    mostrarFichaDigital(producto);
});

tarjeta.appendChild(botonFicha);

const botonEliminar = document.createElement("button");

botonEliminar.type = "button";
botonEliminar.textContent = "Eliminar producto";

botonEliminar.style.backgroundColor = "#c62828";
botonEliminar.style.color = "white";
botonEliminar.style.marginLeft = "10px";

botonEliminar.addEventListener("click", function() {
    eliminarProducto(indice);
});

tarjeta.appendChild(botonEliminar);



        lista.appendChild(tarjeta);
    });
}

// Mostrar productos guardados al abrir la aplicación
mostrarProductos();


 // ======================================
 // FICHA DIGITAL DEL PRODUCTO
 // ======================================

function mostrarFichaDigital(producto) {

    const ficha = document.getElementById("contenidoFicha");

    ficha.innerHTML = "";

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoría: " + producto.categoria;

    const cantidad = document.createElement("p");
    cantidad.textContent = "Cantidad disponible: " + producto.cantidad + " kg";

    const precio = document.createElement("p");
    precio.textContent = "Precio por kg: $" +
        producto.precio.toLocaleString("es-CO") + " COP";

    const fecha = document.createElement("p");
    fecha.textContent = "Fecha de cosecha: " +
        (producto.fechaCosecha || "No registrada");

    ficha.appendChild(titulo);
    ficha.appendChild(categoria);
    ficha.appendChild(cantidad);
    ficha.appendChild(precio);
    ficha.appendChild(fecha);
    // Mostrar fotografía en la ficha digital
if (producto.nombre.toLowerCase().includes("plátano")) {

    const imagenFicha = document.createElement("img");

    imagenFicha.src = "imagenes/platano.jfif";

    imagenFicha.alt = "Fotografía de " + producto.nombre;

    imagenFicha.className = "imagen-producto";

    ficha.appendChild(imagenFicha);
}
    
    // Crear el contenedor del código QR
    const contenedorQR = document.createElement("div");
    contenedorQR.className = "codigo-qr";

    // Preparar la información del producto
   

const informacionQR = window.location.origin +
    window.location.pathname +
    "?producto=" +
    encodeURIComponent(JSON.stringify(producto)) +
    "#fichaDigital";


    // Generar el código QR
generarCodigoQR(contenedorQR, informacionQR);

// Mostrar el QR en la ficha digital
ficha.appendChild(contenedorQR);

    document.getElementById("fichaDigital").scrollIntoView({
        behavior: "smooth"
    });
}


console.log("AgroCumaral está funcionando correctamente.");
// =====================================
// GENERACIÓN DE CÓDIGOS QR - AGROCUMARAL
// =====================================

function generarCodigoQR(contenedor, informacion) {

    contenedor.innerHTML = "";

    new QRCode(contenedor, {
        text: informacion,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
       correctLevel: QRCode.CorrectLevel.L
    });

}

 // LEER PRODUCTO DESDE EL CÓDIGO QR
 function cargarProductoDesdeQR() {
     const parametros = new URLSearchParams(window.location.search);
     const datosProducto = parametros.get("producto");

     if (!datosProducto) return;

     try {
         const producto = JSON.parse(datosProducto);

         if (
             typeof producto.nombre !== "string" ||
             typeof producto.categoria !== "string" ||
             !Number.isFinite(producto.cantidad) ||
             !Number.isFinite(producto.precio)
         ) {
             return;
         }

         mostrarFichaDigital(producto);
     } catch (error) {
         console.error("No se pudo leer el producto del QR:", error);
     }
 }

 // Mostrar automáticamente la ficha al abrir el enlace
 cargarProductoDesdeQR();


function eliminarProducto(indice) {
    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (!confirmar) {
        return;
    }

    productos.splice(indice, 1);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();

    document.getElementById("contenidoFicha").innerHTML = "";

    alert("Producto eliminado correctamente.");
}
// Mostrar productores guardados al abrir la página
mostrarProductores();