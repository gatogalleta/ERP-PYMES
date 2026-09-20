// =========================================
// BOTÓN SOLICITAR DEMO
// =========================================

const btnDemo = document.getElementById("btnDemo");

btnDemo.addEventListener("click", function () {

    alert(
        "Gracias por tu interés en ERP Sistema. " +
        "Próximamente podrás solicitar una demostración."
    );

});


// =========================================
// BOTÓN VER VIDEO
// =========================================

const btnVideo = document.getElementById("btnVideo");

btnVideo.addEventListener("click", function () {

    alert(
        "Aquí se reproducirá el video de presentación " +
        "del sistema ERP."
    );

});


// =========================================
// BOTÓN DE PRECIO
// =========================================

const btnPrecio = document.getElementById("btnPrecio");

btnPrecio.addEventListener("click", function () {

    alert(
        "Un asesor se pondrá en contacto contigo " +
        "para brindarte información sobre el plan."
    );

});


// =========================================
// FORMULARIO DE CONTACTO
// =========================================

const formContacto = document.getElementById("formContacto");

formContacto.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const correo = document.getElementById("correo").value;

    alert(
        "Gracias. Hemos recibido tu correo: " + correo
    );

    formContacto.reset();

});