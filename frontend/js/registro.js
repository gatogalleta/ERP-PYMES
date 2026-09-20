// =========================================
// ELEMENTOS
// =========================================

const paso1 =
    document.getElementById("paso1");

const paso2 =
    document.getElementById("paso2");

const formPaso1 =
    document.getElementById("formPaso1");

const formPaso2 =
    document.getElementById("formPaso2");

const mensajePaso1 =
    document.getElementById("mensajePaso1");

const mensajePaso2 =
    document.getElementById("mensajePaso2");

const volverPaso1 =
    document.getElementById("volverPaso1");


// =========================================
// DATOS DEL PASO 1
// =========================================

const nombres =
    document.getElementById("nombres");

const apellidos =
    document.getElementById("apellidos");

const cedula =
    document.getElementById("cedula");

const fechaNacimiento =
    document.getElementById("fechaNacimiento");


// =========================================
// DATOS DEL PASO 2
// =========================================

const usuario =
    document.getElementById("usuario");

const correo =
    document.getElementById("correo");

const password =
    document.getElementById("password");

const confirmarPassword =
    document.getElementById("confirmarPassword");


// =========================================
// PASO 1 → PASO 2
// =========================================

formPaso1.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        // Limpiar mensaje

        mensajePaso1.className =
            "mensaje-registro";

        mensajePaso1.textContent = "";


        // Obtener valores

        const nombreValor =
            nombres.value.trim();

        const apellidoValor =
            apellidos.value.trim();

        const cedulaValor =
            cedula.value.trim();

        const fechaValor =
            fechaNacimiento.value;


        // Validar campos

        if (
            nombreValor === "" ||
            apellidoValor === "" ||
            cedulaValor === "" ||
            fechaValor === ""
        ) {

            mostrarError(
                mensajePaso1,
                "Por favor, complete todos los campos."
            );

            return;
        }


        // Validar cédula

        if (!/^[0-9]+$/.test(cedulaValor)) {

            mostrarError(
                mensajePaso1,
                "La cédula debe contener solamente números."
            );

            return;
        }


        // Todo correcto

        paso1.classList.remove("activo");

        paso2.classList.add("activo");

    }
);


// =========================================
// PASO 2 → REGISTRO
// =========================================

formPaso2.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        // Limpiar mensaje

        mensajePaso2.className =
            "mensaje-registro";

        mensajePaso2.textContent = "";


        // Valores

        const usuarioValor =
            usuario.value.trim();

        const correoValor =
            correo.value.trim();

        const passwordValor =
            password.value;

        const confirmarValor =
            confirmarPassword.value;


        // Campos vacíos

        if (
            usuarioValor === "" ||
            correoValor === "" ||
            passwordValor === "" ||
            confirmarValor === ""
        ) {

            mostrarError(
                mensajePaso2,
                "Por favor, complete todos los campos."
            );

            return;
        }


        // Validar correo

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!correoValido.test(correoValor)) {

            mostrarError(
                mensajePaso2,
                "Ingrese un correo electrónico válido."
            );

            return;
        }


        // Validar contraseña

        if (passwordValor.length < 6) {

            mostrarError(
                mensajePaso2,
                "La contraseña debe tener mínimo 6 caracteres."
            );

            return;
        }


        // Confirmar contraseña

        if (passwordValor !== confirmarValor) {

            mostrarError(
                mensajePaso2,
                "Las contraseñas no coinciden."
            );

            return;
        }


        // Registro correcto

        mensajePaso2.className =
            "mensaje-registro exito";

        mensajePaso2.textContent =
            "Registro realizado correctamente.";


        // Esperar y volver al login

        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1500);

    }
);


// =========================================
// VOLVER AL PASO 1
// =========================================

volverPaso1.addEventListener(
    "click",
    function () {

        paso2.classList.remove("activo");

        paso1.classList.add("activo");

    }
);


// =========================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =========================================

const mostrarPassword =
    document.getElementById("mostrarPassword");


mostrarPassword.addEventListener(
    "click",
    function () {

        if (password.type === "password") {

            password.type = "text";

            mostrarPassword.textContent =
                "🙈";

        } else {

            password.type = "password";

            mostrarPassword.textContent =
                "👁";

        }

    }
);


// =========================================
// FUNCIÓN DE ERROR
// =========================================

function mostrarError(elemento, texto) {

    elemento.className =
        "mensaje-registro error";

    elemento.textContent =
        texto;

}