// =========================================
// ELEMENTOS DEL FORMULARIO
// =========================================

const formLogin = document.getElementById("formLogin");

const usuario = document.getElementById("usuario");

const password = document.getElementById("password");

const mostrarPassword =
    document.getElementById("mostrarPassword");

const mensajeLogin =
    document.getElementById("mensajeLogin");


// =========================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =========================================

mostrarPassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        mostrarPassword.textContent = "🙈";

    } else {

        password.type = "password";

        mostrarPassword.textContent = "👁";

    }

});


// =========================================
// VALIDACIÓN DEL LOGIN
// =========================================

formLogin.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const usuarioValor = usuario.value.trim();
    const passwordValor = password.value.trim();


    // VALIDAR CAMPOS VACÍOS

    if (usuarioValor === "" || passwordValor === "") {

        mostrarMensaje(
            "Por favor, complete todos los campos.",
            "error"
        );

        return;
    }


    // VALIDACIÓN DE EJEMPLO

    if (
        usuarioValor === "admin@erp.com" &&
        passwordValor === "123456"
    ) {

        mostrarMensaje(
            "Inicio de sesión exitoso. Bienvenido al sistema.",
            "exito"
        );

        // REDIRIGIR AL DASHBOARD
        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {

        mostrarMensaje(
            "Usuario o contraseña incorrectos.",
            "error"
        );

    }

});


// =========================================
// MOSTRAR MENSAJE
// =========================================

function mostrarMensaje(texto, tipo) {

    mensajeLogin.textContent = texto;

    mensajeLogin.style.display = "block";


    if (tipo === "exito") {

        mensajeLogin.style.backgroundColor = "#dcfce7";

        mensajeLogin.style.color = "#166534";

    } else {

        mensajeLogin.style.backgroundColor = "#fee2e2";

        mensajeLogin.style.color = "#991b1b";

    }

}


// =========================================
// RECUPERACIÓN DE CONTRASEÑA
// =========================================

const recuperarPassword =
    document.getElementById("recuperarPassword");


recuperarPassword.addEventListener("click", function (evento) {

    evento.preventDefault();

    alert(
        "La opción de recuperación de contraseña " +
        "estará disponible próximamente."
    );

});