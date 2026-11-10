
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

const productoresPublicos = [
    {
        nombre: "Productor agrícola de demostración",
        ubicacion: "Cumaral, Meta",
        contacto: "Información de contacto no disponible"
    }
];


 
// ======================================
// PRODUCTOS PUBLICOS DE DEMOSTRACION
// ======================================

const productosPublicos = [
    {
        nombre: "Plátano hartón",
        categoria: "Plátanos",
        cantidad: 150,
        precio: 2500,
        fechaCosecha: "2026-11-09"
    },
    {
        nombre: "Naranja",
        categoria: "Cítricos",
        cantidad: 100,
        precio: 5000,
        fechaCosecha: "2026-11-11"
    }
];


// Elementos de la aplicación
const formularioProductor =
    document.getElementById("formProductor");

const formularioProducto =
    document.getElementById("formProducto");

// ======================================
// REGISTRO DE PRODUCTORES
// ======================================


formularioProductor.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreProductor").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const contacto = document.getElementById("contacto").value.trim();

    const mensaje = document.getElementById("mensajeProductor");
    const boton = formularioProductor.querySelector('button[type="submit"]');

    if (!nombre || !ubicacion || !contacto) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const productor = {
        nombre: nombre,
        ubicacion: ubicacion,
        contacto: contacto
    };

    boton.disabled = true;
    mensaje.textContent = "Guardando productor en Firebase...";

    try {
        if (typeof window.guardarProductorFirebase !== "function") {
            throw new Error("Firebase todavía no está disponible.");
        }

        await window.guardarProductorFirebase(productor);

        mensaje.textContent =
            "¡Productor registrado correctamente en Firebase!";

        formularioProductor.reset();

    } catch (error) {
        console.error("Error al registrar productor:", error);

        mensaje.textContent =
            "No se pudo guardar el productor. Intenta nuevamente.";
    } finally {
        boton.disabled = false;
    }
});

// MOSTRAR PRODUCTORES REGISTRADOS
let productoresFirebase = [];

function mostrarProductores() {

    const lista = document.getElementById("listaProductores");

    if (!lista) return;

    lista.innerHTML = "";



const productoresVisibles = [
    ...productoresPublicos,
    ...productores,
    ...productoresFirebase
];

if (productoresVisibles.length === 0) {
    lista.textContent = "No hay productores registrados.";
    return;
}

productoresVisibles.forEach(function(productor, indice) {


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
       const indiceLocal = productores.indexOf(productor);

if (indiceLocal !== -1) {
    productores.splice(indiceLocal, 1);
}
        localStorage.setItem(
            "productores",
            JSON.stringify(productores)
        );

        mostrarProductores();
    }
});



const esProductorLocal = productores.includes(productor);

if (esProductorLocal) {
    tarjeta.appendChild(botonEliminar);
}
        lista.appendChild(tarjeta);

    });
}

// Mostrar productores al cargar la página
mostrarProductores();

window.addEventListener(
    "productoresFirebaseActualizados",
    function(event) {
        productoresFirebase = event.detail;
        mostrarProductores();
    }
);

function iniciarConsultaProductores() {
    if (typeof window.escucharProductoresFirebase === "function") {
        window.escucharProductoresFirebase();
    } else {
        setTimeout(iniciarConsultaProductores, 200);
    }
}

iniciarConsultaProductores();

// ======================================
// PUBLICACION DE PRODUCTOS
// ======================================


formularioProducto.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreProducto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const cantidad = Number(document.getElementById("cantidad").value);
    const precio = Number(document.getElementById("precio").value);
    const fechaCosecha = document.getElementById("fechaCosecha").value;

    const mensaje = document.getElementById("mensajePublicacion");
    const boton = formularioProducto.querySelector('button[type="submit"]');

    if (!nombre || !categoria || !fechaCosecha ||
        !Number.isFinite(cantidad) || cantidad <= 0 ||
        !Number.isFinite(precio) || precio <= 0) {
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

    boton.disabled = true;
    mensaje.textContent = "Publicando producto en Firebase...";

    try {
        if (typeof window.guardarProductoFirebase !== "function") {
            throw new Error("Firebase todavía no está disponible.");
        }

        await window.guardarProductoFirebase(producto);

        mensaje.textContent =
            "¡Producto publicado correctamente en Firebase!";

        formularioProducto.reset();

    } catch (error) {
        console.error("Error al publicar producto:", error);

        mensaje.textContent =
            "No se pudo publicar el producto. Revisa la consola.";
    } finally {
        boton.disabled = false;
    }
});

// ======================================
// MOSTRAR CATALOGO AGRICOLA
// ======================================
let productosFirebase = [];
function mostrarProductos() {


    const lista = document.getElementById("listaProductos");

    lista.innerHTML = "";

    // Combinar productos públicos con productos locales
    // sin repetir los productos de demostración
    
const productosVisibles = [
    ...productosPublicos,

    ...productos.filter(function(productoLocal) {
        return !productosPublicos.some(function(demo) {
            return productoLocal.nombre.trim().toLowerCase() ===
                demo.nombre.trim().toLowerCase();
        });
    }),

    ...productosFirebase
];


   
if (productosVisibles.length === 0) {
    lista.textContent = "Aún no hay productos publicados.";
    return;
}

productosVisibles.forEach(function(producto, indice) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        

const imagen = document.createElement("img");

const nombreProducto = producto.nombre.toLowerCase();


if (nombreProducto.includes("plátano") || nombreProducto.includes("platano")) {
    imagen.src = "imagenes/platano.jfif";
} else if (nombreProducto.includes("naranja")) {
    imagen.src = "imagenes/naranja.jfif";
}


imagen.alt = "Fotografía de " + producto.nombre;
imagen.className = "imagen-producto";

if (imagen.getAttribute("src")) {
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


const esProductoLocal = productos.includes(producto);

if (esProductoLocal) {
    botonEliminar.addEventListener("click", function() {
        const indiceLocal = productos.indexOf(producto);

        if (indiceLocal !== -1) {
            eliminarProducto(indiceLocal);
        }
    });

 
    tarjeta.appendChild(botonEliminar);
}

// Agregar la tarjeta al catálogo
lista.appendChild(tarjeta);


}); // Cierra el forEach

} // Cierra la función mostrarProductos

// Mostrar productos al abrir la aplicación
mostrarProductos();

window.addEventListener(
    "productosFirebaseActualizados",
    function(event) {
        productosFirebase = event.detail;
        mostrarProductos();
    }
);

function iniciarConsultaProductos() {
    if (typeof window.escucharProductosFirebase === "function") {
        window.escucharProductosFirebase();
    } else {
        setTimeout(iniciarConsultaProductos, 200);
    }
}

iniciarConsultaProductos();



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
    const nombreProductoFicha = producto.nombre.toLowerCase();

    const imagenFicha = document.createElement("img");

    if (nombreProductoFicha.includes("plátano") ||
        nombreProductoFicha.includes("platano")) {

        imagenFicha.src = "imagenes/platano.jfif";

    } else if (nombreProductoFicha.includes("naranja")) {

        imagenFicha.src = "imagenes/naranja.jfif";
    }

    imagenFicha.alt = "Fotografía de " + producto.nombre;
    imagenFicha.className = "imagen-producto";

    if (imagenFicha.getAttribute("src")) {
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

 // ======================================
 // ABRIR FICHA DIGITAL DESDE EL CODIGO QR
 // ======================================

function abrirFichaDesdeQR() {

    const parametros = new URLSearchParams(window.location.search);

    const productoQR = parametros.get("producto");

    if (!productoQR) {
        return;
    }

    try {
        const producto = JSON.parse(productoQR);

        if (!producto || typeof producto.nombre !== "string") {
            return;
        }

        mostrarFichaDigital(producto);

    } catch (error) {
        console.error("Error al leer el producto del QR:", error);
    }
}

// Ejecutar cuando la página termine de cargar
window.addEventListener("load", abrirFichaDesdeQR);


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