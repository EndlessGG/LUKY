const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
   container.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
   container.classList.add("toggle");
});

document.addEventListener('DOMContentLoaded', function() {
   const modal = document.getElementById("modal");
   const modalMessage = document.getElementById("modalMessage");
   const closeButton = document.getElementsByClassName("close-button")[0];

   function showModal(message) {
       modalMessage.textContent = message;
       modal.style.display = "block";
   }

   closeButton.onclick = function() {
       modal.style.display = "none";
   }

   window.onclick = function(event) {
       if (event.target === modal) {
           modal.style.display = "none";
       }
   }

   document.getElementById('loginForm').addEventListener('submit', function(event) {
       let isValid = true;
       let errorMessage = "Por favor complete los siguientes campos:\n";

       const loginEmail = document.getElementById('loginEmail');
       if (loginEmail.value.trim() === '') {
           isValid = false;
           errorMessage += "- Email\n";
       }

       const loginPassword = document.getElementById('loginPassword');
       if (loginPassword.value.trim() === '') {
           isValid = false;
           errorMessage += "- Password\n";
       }

       if (!isValid) {
           event.preventDefault();
           showModal(errorMessage);
       }
   });

   document.getElementById('registerForm').addEventListener('submit', function(event) {
       let isValid = true;
       let errorMessage = "Por favor complete los siguientes campos:\n";

       const registerNombres = document.getElementById('registerNombres');
       if (registerNombres.value.trim() === '') {
           isValid = false;
           errorMessage += "- Nombre\n";
       }

       const registerApellidoPaterno = document.getElementById('registerApellidoPaterno');
       if (registerApellidoPaterno.value.trim() === '') {
           isValid = false;
           errorMessage += "- Apellido Paterno\n";
       }

       const registerApellidoMaterno = document.getElementById('registerApellidoMaterno');
       if (registerApellidoMaterno.value.trim() === '') {
           isValid = false;
           errorMessage += "- Apellido Materno\n";
       }

       const registerEmail = document.getElementById('registerEmail');
       if (registerEmail.value.trim() === '') {
           isValid = false;
           errorMessage += "- Correo\n";
       }

       const registerPassword = document.getElementById('registerPassword');
       if (registerPassword.value.trim() === '') {
           isValid = false;
           errorMessage += "- Contraseña\n";
       }

       if (!isValid) {
           event.preventDefault();
           showModal(errorMessage);
       }
   });
});
