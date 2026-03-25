console.log("Hola Mundo");

var usuarioCorrecto = "admin";
var contrasenaCorrecta = "abc123";

var usuarioInput    = document.getElementById("usuario");
var contrasenaInput = document.getElementById("contrasena");
var errorUsuario    = document.getElementById("errorUsuario");
var errorContrasena = document.getElementById("errorContrasena");
var mensajeGeneral  = document.getElementById("mensajeGeneral");
var boton           = document.getElementById("iniciarSesionBtn");

var modalOverlay       = document.getElementById("modalOverlay");
var olvidaLink         = document.getElementById("olvideMiContrasenaLink");
var cerrarModalBtn     = document.getElementById("cerrarModalBtn");
var enviarCorreoBtn    = document.getElementById("enviarCorreoBtn");
var correoInput        = document.getElementById("correo");
var errorCorreo        = document.getElementById("errorCorreo");
var confirmacionCorreo = document.getElementById("confirmacionCorreo");

function mostrarError(span, input) {
    span.classList.remove("oculto");
    span.classList.add("visible");
    if (input) input.classList.add("input-error");
}

function ocultarError(span, input) {
    span.classList.remove("visible");
    span.classList.add("oculto");
    if (input) input.classList.remove("input-error");
}

// Limpiar errores al escribir 
usuarioInput.addEventListener("input", function () {
    ocultarError(errorUsuario, usuarioInput);
    ocultarError(mensajeGeneral, null);
});

contrasenaInput.addEventListener("input", function () {
    ocultarError(errorContrasena, contrasenaInput);
    ocultarError(mensajeGeneral, null);
});

// Iniciar sesión 
function iniciarSesion() {
    var hayError = false;

    // Paso 1: Validar que el Usuario y Contraseña no estén vacíos
    if (usuarioInput.value.trim() === "") {
        mostrarError(errorUsuario, usuarioInput);
        hayError = true;
    } else {
        ocultarError(errorUsuario, usuarioInput);
    }

    if (contrasenaInput.value.trim() === "") {
        mostrarError(errorContrasena, contrasenaInput);
        hayError = true;
    } else {
        ocultarError(errorContrasena, contrasenaInput);
    }

    if (hayError) return;

    // Paso 2: Validar que el Usuario y Contraseña sean correctos
    if (usuarioInput.value === usuarioCorrecto && contrasenaInput.value === contrasenaCorrecta) {
        ocultarError(mensajeGeneral, null);
        alert("¡Bienvenido, " + usuarioInput.value + "!");
    } else {
        mostrarError(mensajeGeneral, null);
    }
}

boton.addEventListener("click", iniciarSesion);

// Modal: Olvidé mi contraseña 
olvidaLink.addEventListener("click", function (e) {
    e.preventDefault();
    modalOverlay.classList.remove("oculto");
    correoInput.value = "";
    ocultarError(errorCorreo, correoInput);
    ocultarError(confirmacionCorreo, null);
});

cerrarModalBtn.addEventListener("click", function () {
    modalOverlay.classList.add("oculto");
});

// Cerrar modal al hacer clic fuera del cuadro
modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add("oculto");
    }
});

enviarCorreoBtn.addEventListener("click", function () {
    if (correoInput.value.trim() === "" || !correoInput.value.includes("@")) {
        mostrarError(errorCorreo, correoInput);
        ocultarError(confirmacionCorreo, null);
    } else {
        ocultarError(errorCorreo, correoInput);
        confirmacionCorreo.classList.remove("oculto");
        confirmacionCorreo.classList.add("visible");

        // Cerrar modal tras 2.5 segundos
        setTimeout(function () {
            modalOverlay.classList.add("oculto");
        }, 2500);
    }
});