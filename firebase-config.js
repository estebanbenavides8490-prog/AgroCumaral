import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";


import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKq6x9NofKrn3N9b7Bilr_X5F7vPZtvCU",
    authDomain: "agrocumaral-c9be3.firebaseapp.com",
    projectId: "agrocumaral-c9be3",
    storageBucket: "agrocumaral-c9be3.firebasestorage.app",
    messagingSenderId: "452598087195",
   appId: "1:452598087195:web:16c3059b04ab4dc77502be"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

signInAnonymously(auth)
    .then(function(resultado) {
        console.log("Firebase conectado correctamente");
        console.log("Usuario autenticado:", resultado.user.uid);
    })
    .catch(function(error) {
        console.error("Error al conectar con Firebase:", error);
    });
    
async function guardarProductorFirebase(productor) {

    if (!auth.currentUser) {
        throw new Error("El usuario todavía no está autenticado.");
    }

    const datosProductor = {
        nombre: productor.nombre,
        ubicacion: productor.ubicacion,
        contacto: productor.contacto,
        creadoPor: auth.currentUser.uid
    };

    const referencia = await addDoc(
        collection(db, "productores"),
        datosProductor
    );

    console.log("Productor guardado en Firebase:", referencia.id);

    return referencia.id;
}

window.guardarProductorFirebase = guardarProductorFirebase;

function escucharProductoresFirebase() {

    return onSnapshot(
        collection(db, "productores"),

        function(snapshot) {

            const productoresFirebase = [];

            snapshot.forEach(function(documento) {
                productoresFirebase.push({
                    id: documento.id,
                    ...documento.data()
                });
            });

            console.log(
                "Productores recibidos desde Firebase:",
                productoresFirebase.length
            );

            window.dispatchEvent(
                new CustomEvent("productoresFirebaseActualizados", {
                    detail: productoresFirebase
                })
            );
        },

        function(error) {
            console.error(
                "Error al consultar productores:",
                error
            );
        }
    );
}

window.escucharProductoresFirebase = escucharProductoresFirebase;

async function guardarProductoFirebase(producto) {

    if (!auth.currentUser) {
        throw new Error("El usuario todavía no está autenticado.");
    }

    const datosProducto = {
        nombre: producto.nombre,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
        precio: producto.precio,
        fechaCosecha: producto.fechaCosecha,
        creadoPor: auth.currentUser.uid
    };

    const referencia = await addDoc(
        collection(db, "productos"),
        datosProducto
    );

    console.log(
        "Producto guardado en Firebase:",
        referencia.id
    );

    return referencia.id;
}

window.guardarProductoFirebase = guardarProductoFirebase;


function escucharProductosFirebase() {

    return onSnapshot(
        collection(db, "productos"),

        function(snapshot) {

            const productosFirebase = [];

            snapshot.forEach(function(documento) {
                productosFirebase.push({
                    id: documento.id,
                    ...documento.data()
                });
            });

            console.log(
                "Productos recibidos desde Firebase:",
                productosFirebase.length
            );

            window.dispatchEvent(
                new CustomEvent("productosFirebaseActualizados", {
                    detail: productosFirebase
                })
            );
        },

        function(error) {
            console.error(
                "Error al consultar productos:",
                error
            );
        }
    );
}

window.escucharProductosFirebase = escucharProductosFirebase;



