// =========================================
// CERRAR SESIÓN
// =========================================

const cerrarSesion =
    document.getElementById("cerrarSesion");


cerrarSesion.addEventListener("click", function () {

    const confirmar = confirm(
        "¿Está seguro de que desea cerrar sesión?"
    );


    if (confirmar) {

        window.location.href = "login.html";

    }

});


// =========================================
// NOTIFICACIONES
// =========================================

const btnNotificaciones =
    document.getElementById("btnNotificaciones");


btnNotificaciones.addEventListener("click", function () {

    alert(
        "Tienes 3 notificaciones pendientes."
    );

});


// =========================================
// BUSCADOR
// =========================================

const busqueda =
    document.getElementById("busqueda");


busqueda.addEventListener("keyup", function () {

    const texto = busqueda.value.trim();


    if (texto.length > 0) {

        console.log(
            "Buscando: " + texto
        );

    }

});


// =========================================
// ALERTAS
// =========================================

const verAlertas =
    document.getElementById("verAlertas");


verAlertas.addEventListener("click", function () {

    alert(
        "Aquí se mostrarán todas las alertas y pendientes."
    );

});


// =========================================
// ACCIONES RÁPIDAS
// =========================================

document
    .getElementById("nuevaVenta")
    .addEventListener("click", function () {

        alert(
            "Módulo de nueva venta próximamente disponible."
        );

    });


document
    .getElementById("nuevoProducto")
    .addEventListener("click", function () {

        alert(
            "Módulo para registrar productos próximamente disponible."
        );

    });


document
    .getElementById("nuevaFactura")
    .addEventListener("click", function () {

        alert(
            "Módulo de facturación próximamente disponible."
        );

    });


document
    .getElementById("nuevoReporte")
    .addEventListener("click", function () {

        alert(
            "Módulo de reportes próximamente disponible."
        );

    });


// =========================================
// ACTIVIDAD
// =========================================

document
    .getElementById("verActividad")
    .addEventListener("click", function () {

        alert(
            "Aquí se mostrará el historial completo de actividades."
        );

    });