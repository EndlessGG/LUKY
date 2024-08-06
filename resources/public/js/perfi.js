document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const modal = document.getElementById("modal");
    const closeButton = document.getElementsByClassName("close")[0];
    const modalMessage = document.getElementById("modalMessage");

    // Mostrar el modal
    document.getElementById('agregar-publicacion').addEventListener('click', function() {
        modal.style.display = "block";
    });

    // Cerrar el modal
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // ACTIVACION DE MODAL SCRIPT PARA LA CARGA
    document.getElementById('modal-form').addEventListener('submit', function(event) {
        let isValid = true;
        let errorMessage = "Por favor complete los siguientes campos:\n";

        const tituloP = document.getElementById('tituloP');
        if (tituloP.value.trim() === '') {
            isValid = false;
            errorMessage += "- Título de la Publicación\n";
        }

        const descripcion = document.getElementById('descripcion');
        if (descripcion.value.trim() === '') {
            isValid = false;
            errorMessage += "- Descripción\n";
        }

        const precioI = document.getElementById('precioI');
        if (precioI.value.trim() === '') {
            isValid = false;
            errorMessage += "- Precio Inicial\n";
        }

        const input5 = document.getElementById('input5');
        if (input5.value === '') {
            isValid = false;
            errorMessage += "- Selección de Opción\n";
        }

        const precioF = document.getElementById('precioF');
        if (precioF.value.trim() === '') {
            isValid = false;
            errorMessage += "- Precio Final\n";
        }

        if (!isValid) {
            event.preventDefault();
            showModal(errorMessage);
        }
    });

    // Función para mostrar el modal con un mensaje
    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }
});
